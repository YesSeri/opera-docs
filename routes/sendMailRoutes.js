const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.use(express.json());

router.post('/', (req, res) => {
  console.log(req.body)
  const { email, name, subject, text } = req.body;
  console.log(email, subject, text);
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.FROM_EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.TO_EMAIL,
    subject,
    text,
  };
  // I make two emails, because the first one always goes to my spam folder in gmail. The second one will go to most of the time go to real folder, because transporter host, and from adress are correct together. Might be able to remove the second email if it works without. Just for testing now. 
  const mailOptionsNotSpam = {
    from: `"operadocsContact" <${process.env.FROM_EMAIL}>`,
    to: process.env.TO_EMAIL,
    subject: `${email} - ${subject}`,
    text,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).end('Error');
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    transporter.sendMail(mailOptionsNotSpam, (error, info) => {
      if (error) {
        res.status(500).end('Error');
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      res.status(200).end('It worked');
    });
  });
});

module.exports = router;