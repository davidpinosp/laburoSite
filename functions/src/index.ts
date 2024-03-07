
import * as functions from 'firebase-functions';
// const {logger} = require("firebase-functions");
const {onRequest} = require("firebase-functions/v2/https");
// const {onDocumentCreated} = require("firebase-functions/v2/firestore");

const sgMail = require('@sendgrid/mail')
const {initializeApp} = require("firebase-admin/app");
// const {getFirestore} = require("firebase-admin/firestore");

initializeApp();


exports.sendmessage = onRequest(async (req:functions.Request, res:functions.Response) => {
    // Grab the text parameter.
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
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
        
        console.log('Email sent');
        res.status(200).json({ result: 'Email Sent' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ result: error });
    }
});



