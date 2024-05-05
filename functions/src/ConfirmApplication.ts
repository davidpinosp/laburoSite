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

const postApplicationConfirmation = async (
  name: string,
  title: string,
  company: string,
  destination: string,
) => {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

    const msg = {
      to: destination,
      from: `Laburo <${process.env.SENDER_EMAIL as string}>`,

      subject: "Tu aplicación ha sido enviada ",
      text: "Laburo",
      html:
        `
<!DOCTYPE html>
<html lang='es'>
<head>
    <meta charset='UTF-8'>
    <title>Gracias por aplicar con Laburo</title>
</head>
<body>
    <div style='font-family: Arial, sans-serif; margin: 20px; color: #333;'>
        <h1>` +
        company +
        `</h1>
        <h2>Confirmación de Aplicación</h2>
        <p>Estimado ` +
        name +
        `,</p>
        <p>Te agradecemos por postularte al puesto de ` +
        title +
        " para la empresa " +
        company +
        ` </p>
        <p>La empresa se pondra en contacto contigo si eres seleccionado. Si tienes alguna pregunta , por favor ponte en contacto directamente con la empresa o agencia en la publicación. Por favor no respondas a este correo, ya que el buzón no es revisado de manera frecuente.</p>
        <p>Saludos y suerte en tu busqueda,<br>Equipo de Laburo</p>
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

export { postApplicationConfirmation };
