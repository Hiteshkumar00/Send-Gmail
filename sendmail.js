const nodemailer = require("nodemailer");
require('dotenv').config();

const from = process.env.FROM;
const pass = process.env.PASS;

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: from,
    pass: pass,
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main(send_to, sub, msg, files) {

  let ins = "If anyone sent you any harmfull message. ignore it and throw Gmail account in spam. this web's purpose help to those person who can not login their email account";
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"Send Mail Website 👻" <${from}>`, // sender address
    to: send_to, // list of receivers
    subject: sub, // Subject line
    text: "",
    html: `<p>${ins}</p><p>${msg}</p>`,
     // plain text body
    attachments: files
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

module.exports = main;