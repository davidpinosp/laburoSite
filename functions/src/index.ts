import * as functions from "firebase-functions";
import { default as StripePackage } from "stripe";
import * as admin from "firebase-admin";
import { onRequest } from "firebase-functions/v2/https";
import sgMail = require("@sendgrid/mail");
import { initializeApp } from "firebase-admin/app";
import { postPaymentConfirmation } from "./ConfirmOrder";
import { recievedContactUsMail } from "./ContactUs";
// import cors from "cors";
// const corsHandler = cors({ origin: true });

interface JobInt {
  title: string;
  company: string;
  datePosted: Date;
  description: string;
  location: {
    city: string;
    country: string;
    latitude: number;
    longitude: number;
  };
  inPerson: boolean;
  fullTime: boolean;
  recieveViaEmail: boolean;
  recieveEmail: string;
  imageURL?: string | undefined;
}

initializeApp();

const db = admin.firestore();
const stripeKey = process.env.STRIPE_TEST_KEY as string;
const stripe = new StripePackage(stripeKey);
exports.sendmessage = onRequest(
  { cors: true, enforceAppCheck: true },
  async (req: functions.Request, res: functions.Response) => {
    // Grab the text parameter.

    try {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");
      const data = req.body;
      const msg = {
        to: data.to,
        from: process.env.SENDER_EMAIL || "",
        subject: data.subject,
        text: "Laburo",
        html:
          "<!DOCTYPE html> <html lang=`en`> <head> <meta charset=`UTF-8`> <meta http-equiv=`X-UA-Compatible` content=`IE=edge`><meta name=`viewport` content=`width=device-width, initial-scale=1.0`> <title>Recibiste una Aplicación" +
          " </title> </head><body style=`font-family: 'Arial', sans-serif;`> <h2>Recibiste Una Aplicación</h2><p>Estimado/a,</p><p> Haz recibido una aplicación a través de Laburo. La aplicación es para la posición de " +
          data.jobName +
          ", publicada " +
          data.date +
          ". <br> Estos son los detalles del aplicante:</p><ul> <li><strong>Nombre:</strong> " +
          data.name +
          "</li><li><strong>Email:</strong> " +
          data.email +
          "</li><li><strong>Numero Celular:</strong> " +
          data.number +
          "</li><li><strong>Descripción:</strong>" +
          data.html +
          "  </li></ul><p>¡Muchas Gracias por confiar en nosotros!</p><p>Suerte en su busqueda,<br>El equipo de Laburo</p></body></html>",
      };

      await sgMail.send(msg);

      res.status(200).json({ result: "Email Sent" });
    } catch (error) {
      res.status(500).json({ result: "Error" + " " + error });
    }
  },
);

exports.stripeCheckoutSession = onRequest(
  { cors: true, enforceAppCheck: true },
  async (req, res) => {
    // corsHandler(req, res, async () => {

    try {
      if (req.method === "OPTIONS") {
        res.status(200).send(); // Respond to preflight requests
        return;
      } else if (req.method !== "POST") {
        res.status(405).send("Method Not Allowed");
        return;
      } else {
        const id = await createTempPosition(req.body);
        const session = await stripe.checkout.sessions.create({
          line_items: [
            {
              price: process.env.PRICE_PRODUCT_STRIPE as string,
              quantity: 1,
            },
          ],
          mode: "payment",
          success_url: `${"http://quierolaburo.com/post-job?success=true"}`,
          cancel_url: `${"http://quierolaburo.com/post-job?success=false"}`,
          automatic_tax: { enabled: true },
          metadata: {
            jobData: id,
          },
        });
        // functions.logger.log(req.body);

        // res.redirect(303, session.url as string);
        res.status(200).json({ url: session.url as string });
      }
    } catch (error) {
      functions.logger.error("Error encountered in stripe checkout", error);
      console.error("Error creating Checkout session:", error);
      res.status(500).send("Error creating Checkout session");
    }
    // });
  },
);

exports.eventHandler = onRequest(
  { cors: true, enforceAppCheck: true },
  async (req, res) => {
    const endpointSecret = process.env.ENDPOINT_SECRET || "";
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        sig as string,
        endpointSecret,
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.status(400).send(`Webhook Error: ${err.message}`);
      } else {
        res.status(400).send(`Webhook Error: ${String(err)}`);
      }
    }

    if (event?.type === "checkout.session.completed") {
      const checkoutSession = event.data.object.metadata;
      const payload: string = checkoutSession?.jobData as string;
      const receiveAddress = event.data.object.customer_details
        ?.email as string;

      // Fulfill the purchase...
      try {
        const result = await fulfillOrder(payload, receiveAddress);
        if (result === true) {
          res.status(200).end();
        } else {
          res.status(400).send("Could not create record ");
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          res.status(400).send(`Document Creation Error: ${err.message}`);

          functions.logger.error("Error encountered in event handler", err);
        } else {
          res.status(400).send(`Document Creation Error: ${String(err)}`);
          functions.logger.error("Error encountered in event  handler", err);
        }
      }
    }

    res.status(200).end();
  },
);

exports.customerSupport = onRequest(
  { cors: true, enforceAppCheck: true },
  async (req, res) => {
    try {
      recievedContactUsMail(req.body);
      res.status(200).json({ result: "Email Sent" });
    } catch (err) {
      res.status(500).json({ result: "Email Error " + err });
    }
  },
);

// create job

const createTempPosition = async (payload: JobInt) => {
  try {
    const doc = await db.collection("job").add(payload);

    return doc.id.toString();
  } catch (err) {
    functions.logger.log("error getting id" + err);
  }
  return "";
};

//  edit to make the thing valid
const fulfillOrder = async (payload: string, recieveAdrress: string) => {
  // TODO: get the metadata from the transaction and create the posting with the jobid
  try {
    const docRef = db.collection("job").doc(payload);
    try {
      await docRef.update({
        status: true,
      });

      functions.logger.log(" Document Successfully created");
    } catch (error) {
      console.error("Error updating document: ", error);
    }

    // edit to make temporary active

    await postPaymentConfirmation(recieveAdrress);

    functions.logger.log("Successfully created");

    return true;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};
