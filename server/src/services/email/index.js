const nodemailer = require("nodemailer");

const resetPasswordEmail = async (email = "test") => {
  let account = await nodemailer.createTestAccount();
  let transporter;
  if (process.env.NODE_ENV === "production") {
    transporter = nodemailer.createTransport({
      host: "smtp.sendgrid.net", // <-- real smtp server
      port: 465,
      secure: true,
      auth: {
        user: "apikey",
        pass: process.env.SEND_GRID_KEY
      }
    });
  } else {
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email", // <-- test smtp server
      port: 587,
      secure: false,
      auth: {
        user: account.user,
        pass: account.pass
      }
    });
  }

  const html = `
    <h3>Reset password email Augerio</h3>
  `;

  let mailOptions = {
    from: "Augerio <<Augerio@mail.conoroflanagan.com>>", // sender address
    to: email, // list of receivers
    subject: `Augerio account password reset`, // Subject line
    text: "password reset email", // plain text body
    html // html body
  };

  let info = await transporter.sendMail(mailOptions);
  if (process.env.NODE_ENV === "development") {
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }
};

module.exports = resetPasswordEmail;
