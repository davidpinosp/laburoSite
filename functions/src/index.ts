import * as functions from "firebase-functions";

import { default as StripePackage } from "stripe";
// import * as admin from "firebase-admin";
import { onRequest } from "firebase-functions/v2/https";
import sgMail = require("@sendgrid/mail");
import { initializeApp } from "firebase-admin/app";
import { postPaymentConfirmation } from "./ConfirmOrder.js";
import { recievedContactUsMail } from "./ContactUs.js";
import { postApplicationConfirmation } from "./ConfirmApplication.js";
import { sendDocument } from "./SendDocument.js";
import getJobsByLocationAndPosition from "./mongoDB/JobPostings/getByLocationAndPosition.js";
import { LocationData } from "./interface/LocationData.js";
import { getDbLengthJobsByLocationAndPosition } from "./mongoDB/DbUtils/GetDBLength.js";
import getSingleJob from "./mongoDB/JobPostings/getSingleJob.js";
import {
  addJobPost,
  generateUniqueEditId,
  updateJopPostStatus,
} from "./mongoDB/JobPostings/postJob.js";
import { JobInt } from "./interface/JobInt.js";
import {
  updateJobPostOrStatus,
  getJobByEditKey,
} from "./mongoDB/JobPostings/editJob.js";
// const corsHandler = cors({ origin: true });
// import { fileTypeFromBuffer } from "file-type";

initializeApp();

// todo: length is not working properly, just get it from the results of db dumbass you only need the other funct for total length

// const db = admin.firestore();
const stripeKey = process.env.STRIPE_TEST_KEY as string;
const stripe = new StripePackage(stripeKey);

exports.sendmessage = onRequest(
  { cors: true, enforceAppCheck: true },
  async (req: functions.Request, res: functions.Response) => {
    try {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");
      const data = req.body;

      await sendDocument(req);
      await postApplicationConfirmation(
        data.name,
        data.jobName,
        data.company,
        data.email,
      );

      res.status(200).json({ result: "Emails Sent Succesfully" });
    } catch (error) {
      res.status(500).json({ result: "Error" + " " + error });
    }
  },
);

exports.stripeCheckoutSession = onRequest(
  { cors: true, enforceAppCheck: true },
  async (req, res) => {
    try {
      if (req.method === "OPTIONS") {
        res.status(200).send(); // Respond to preflight requests
        return;
      } else if (req.method !== "POST") {
        res.status(405).send("Method Not Allowed");
        return;
      } else {
        // get editKey id from function and store
        const bodyData = req.body;
        const editId = generateUniqueEditId();
        bodyData.editKey = editId;

        const id = await addJobPost(bodyData);

        const session = await stripe.checkout.sessions.create({
          line_items: [
            {
              price: process.env.PRICE_PRODUCT_STRIPE as string,
              quantity: 1,
            },
          ],
          mode: "payment",
          allow_promotion_codes: true,
          success_url: `${"http://quierolaburo.com/post-job?success=true"}`,
          cancel_url: `${"http://quierolaburo.com/post-job?success=false"}`,
          automatic_tax: { enabled: true },
          metadata: {
            jobData: id,
            editKey: editId,
          },
        });

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
        sig as string | string[],
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
      const payload = {
        jobData: checkoutSession?.jobData,
        editKey: checkoutSession?.editKey,
      };

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

// mongoDB
// description : function to get job position based on filters , position and title
interface JobFilters {
  [key: string]: string | number | Date | boolean; // Depending on your specific needs
}
interface GetJobsOptions {
  location: LocationData;
  title: string;
  pageSize?: number;
  lastId?: string;
  filters?: JobFilters;
}

// get jobs by multiple filters
exports.getJobs = onRequest(
  { cors: true, enforceAppCheck: true },
  async (req, res) => {
    try {
      const {
        location,
        title,
        pageSize = 10,
        lastId,
        filters,
      } = req.body as GetJobsOptions;
      const results = await getJobsByLocationAndPosition(
        location,
        title,
        pageSize,
        filters,
        lastId,
      );

      res.status(200).json({ results: results.jobs, length: results.length }); // Ensure proper method chaining for setting status
    } catch (error) {
      console.log(error);

      res;
      res
        .status(500)
        .json({ message: "There has been an error", error: error }); // Send a JSON response with the error message
    }
  },
);

// find single job by id
exports.findJob = onRequest(
  { cors: true, enforceAppCheck: true },
  async (req, res) => {
    try {
      const id = req.body.id;
      const results = await getSingleJob(id);

      res.status(200).json({ results }); // Ensure proper method chaining for setting status
    } catch (error) {
      console.log(error);

      res
        .status(500)
        .json({ message: "There has been an error", error: error }); // Send a JSON response with the error message
    }
  },
);

// function that gets the length of the estimated number of jobs base on a query

exports.getDbLength = onRequest(
  { cors: true, enforceAppCheck: true },
  async (req, res) => {
    try {
      const { location, title } = req.body;
      const results = await getDbLengthJobsByLocationAndPosition(
        location as LocationData,
        title as string,
      );

      res.status(200).json({ results }); // Ensure proper method chaining for setting status
    } catch (error) {
      console.log(error);

      res
        .status(500)
        .json({ message: "There has been an error", error: error }); // Send a JSON response with the error message
    }
  },
);

// function to post job
exports.postJob = onRequest(
  { cors: true, enforceAppCheck: true },
  async (req, res) => {
    try {
      const data = req.body;

      await addJobPost(data);
      res.status(200).json({ message: "Record Created Succesfully" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "There has been an error", error: error }); // Send a JSON response with the error message
    }
  },
);

exports.findJobByEditKey = onRequest(
  { cors: true, enforceAppCheck: true },
  async (req, res) => {
    try {
      const editKey: string = req.body.editKey;
      console.log(editKey);

      const results = await getJobByEditKey(editKey);

      res.status(200).json({ results });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "There has been an error", error: error }); // Send a JSON response with the error message
    }
  },
);

exports.editJobStatusAndDescription = onRequest(
  { cors: true, enforceAppCheck: true },
  async (req, res) => {
    try {
      const jobData: JobInt = req.body;

      await updateJobPostOrStatus(jobData);

      res.status(200).json({ message: "Record Updated Succesfully" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "There has been an error", error: error }); // Send a JSON response with the error message
    }
  },
);

// ------------------------------------
// create job

// const createTempPosition = async (payload: JobInt) => {
//   try {
//     const doc = await db.collection("job").add(payload);

//     return doc.id.toString();
//   } catch (err) {
//     functions.logger.log("error getting id" + err);
//   }
//   return "";
// };

//  edit to make the thing valid
const fulfillOrder = async (
  data: { jobData: string | undefined; editKey: string | undefined },
  recieveAdrress: string,
) => {
  // TODO: get the metadata from the transaction and create the posting with the jobid
  try {
    // const docRef = db.collection("job").doc(payload);

    if (data.jobData) {
      await updateJopPostStatus(data.jobData);
    }

    if (data.editKey) {
      await postPaymentConfirmation(recieveAdrress, data.editKey);
    }

    functions.logger.log("Successfully created");

    return true;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};
