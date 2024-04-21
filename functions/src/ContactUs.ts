import sgMail = require("@sendgrid/mail");

const recievedContactUsMail = async (payload: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    const data: {
      name: string;
      email: string;
      subject: string;
      message: string;
    } = payload;
    sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

    const msg = {
      to: "support@quierolaburo.com",
      from: process.env.SENDER_EMAIL || "",

      subject: "CUSTOMER SUPPORT QUESTION",
      text: "Laburo",
      html:
        `
<!DOCTYPE html>
<html lang='es'>
<head>
    <meta charset='UTF-8'>
    <title>Client Request</title>
</head>
<body>` +
        "Name: " +
        data.name +
        "<br>Email: " +
        data.email +
        "<br>Subject: " +
        data.subject +
        "<br>Message: " +
        data.message +
        `
  
    
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

export { recievedContactUsMail };
