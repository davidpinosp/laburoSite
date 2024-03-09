/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as functions from "firebase-functions";
// const {logger} = require("firebase-functions");
import {onRequest} from "firebase-functions/v2/https";
// const {onDocumentCreated} = require("firebase-functions/v2/firestore");

import sgMail = require("@sendgrid/mail");
import {initializeApp} from "firebase-admin/app";
// const {getFirestore} = require("firebase-admin/firestore");
initializeApp();
exports.sendmessage =
onRequest(async (req:functions.Request, res:functions.Response) => {
  // Grab the text parameter.
  try {
    const data = req.body;

    const msg = {
      to: data.to,
      from: data.from,
      subject: data.subject,
      text: data.text,
      html: data.html,
    };

    await sgMail.send(msg);

    console.log("Email sent");
    res.status(200).json({result: "Email Sent"});
  } catch (error) {
    console.error(error);
    res.status(500).json({result: "Error"});
  }
});
