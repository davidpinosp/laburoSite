import * as functions from "firebase-functions";
// const {logger} = require("firebase-functions");
import { onRequest } from "firebase-functions/v2/https";
// const {onDocumentCreated} = require("firebase-functions/v2/firestore");
import sgMail = require("@sendgrid/mail");

import { initializeApp } from "firebase-admin/app";
// const {getFirestore} = require("firebase-admin/firestore");
initializeApp();
exports.sendmessage = onRequest(
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

      console.log("Email sent");
      res.status(200).json({ result: "Email Sent" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ result: "Error" + " " + error });
    }
  },
);
