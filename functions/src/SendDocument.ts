import * as functions from "firebase-functions";

import { default as axios } from "axios";
import sgMail = require("@sendgrid/mail");

export const sendDocument = async (req: functions.Request) => {
  const data = req.body;
  const date = new Date(data.date);
  const formattedDate = date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");
  try {
    let attachment;
    let filename;

    let msg;
    const html =
      "<!DOCTYPE html> <html lang=`en`> <head> <meta charset=`UTF-8`> <meta http-equiv=`X-UA-Compatible` content=`IE=edge`><meta name=`viewport` content=`width=device-width, initial-scale=1.0`> <title>Recibiste una Aplicación" +
      " </title> </head><body style=`font-family: 'Arial', sans-serif;`> <h2>Recibiste Una Aplicación</h2><p>Estimado/a,</p><p> Haz recibido una aplicación a través de Laburo. La aplicación es para la posición de " +
      data.jobName +
      ", publicada el " +
      formattedDate +
      ". <br> Estos son los detalles del aplicante:</p><ul> <li><strong>Nombre:</strong> " +
      data.name +
      "</li><li><strong>Email:</strong> " +
      data.email +
      "</li><li><strong>Numero Celular:</strong> " +
      data.number +
      "</li><li><strong>Descripción:</strong>" +
      data.html +
      "  </li></ul><p>¡Muchas Gracias por confiar en nosotros!</p><p>Suerte en su búsqueda,<br>El equipo de Laburo</p></body></html>";

    if (data.imgUrl) {
      const response = await axios({
        method: "get",
        url: data.imgUrl,
        responseType: "arraybuffer", // Important to process as blob
      });

      const uint8arr: Uint8Array = new Uint8Array(response.data);
      attachment = Buffer.from(response.data).toString("base64");
      let filetype: string | null = null;
      const signatures: { [key: string]: string } = {
        "504B0304":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
        "25504446": "application/pdf", // PDF
      };
      let fileExtension: string | undefined;

      const isPlainText = (data: Uint8Array): boolean => {
        return data.every(
          (byte) =>
            byte <= 127 &&
            (byte >= 32 || byte === 9 || byte === 10 || byte === 13),
        );
      };

      if (uint8arr.length >= 4) {
        let signature = "";
        for (let i = 0; i < 4; i++) {
          signature += uint8arr[i].toString(16).padStart(2, "0");
        }
        signature = signature.toUpperCase();

        if (signatures[signature]) {
          filetype = signatures[signature];
          fileExtension =
            filetype ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              ? ".docx"
              : ".pdf";
        } else if (isPlainText(uint8arr)) {
          filetype = "text/plain";
          fileExtension = ".txt";
        }
      }

      if (filetype && fileExtension) {
        filename = `${data.name}_LaburoCV`;
      }

      if (attachment) {
        msg = {
          to: data.to,
          from: process.env.SENDER_EMAIL || "",
          subject: data.subject,
          text: "Laburo",
          attachments: [
            {
              content: attachment as string,
              filename: filename as string,
              type: filetype as string,
              disposition: "attachment",
            },
          ],
          html: html,
        };
        sgMail.send(msg);
      }

      return true;
    } else {
      // res.send("No file type detected or file is too short to determine.");
      msg = {
        to: data.to,
        from: process.env.SENDER_EMAIL || "",
        subject: data.subject,
        text: "Laburo",

        html: html,
      };
      sgMail.send(msg);
      return false;
    }
  } catch (error: unknown) {
    console.error(error);
    throw error;
  }
};
