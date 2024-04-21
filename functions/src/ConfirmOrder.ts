import sgMail = require("@sendgrid/mail");
// interface JobInt {
//   title: string;
//   company: string;
//   datePosted: Date;
//   description: string;
//   location: {
//     city: string;
//     country: string;
//     latitude: number;
//     longitude: number;
//   };
//   inPerson: boolean;
//   fullTime: boolean;
//   recieveViaEmail: boolean;
//   recieveEmail: string;
//   imageURL?: string | undefined;
// }

const postPaymentConfirmation = async (destination: string) => {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

    const msg = {
      to: destination,
      from: process.env.SENDER_EMAIL || "",

      subject: "Gracias Por Confiar en Nosotros ",
      text: "Laburo",
      html: `
<!DOCTYPE html>
<html lang='es'>
<head>
    <meta charset='UTF-8'>
    <title>Factura de Compra</title>
</head>
<body>
    <div style='font-family: Arial, sans-serif; margin: 20px; color: #333;'>
        <h1>Laburo</h1>
        <h2>Factura de Compra</h2>
        <p>Estimado cliente,</p>
        <p>Te agradecemos por confiar en Laburo. Ahora estás un paso más cerca de encontrar al mejor talento para tu empresa. Si tienes alguna pregunta o necesitas más información, no dudes en contactarnos a nuestro correo <a href='mailto:support@quierolaburo.com'>support@quierolaburo.com</a>.</p>
        <p>Esperamos verte de nuevo. ¡Siempre a tu servicio!</p>
        <p>Saludos,<br>Equipo de Laburo</p>
    </div>
</body>
</html>
`,
    };

    await sgMail.send(msg);

    return true;
  } catch (error) {
    return false;
  }
};

export { postPaymentConfirmation };
