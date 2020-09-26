const express = require('express');
const router = express.Router();
var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

router.use(express.json());

router.post('/', (req, res) => {
  const { email, subject, text } = req.body;
  const mailOptions = {
    from: email,
    to: process.env.EMAIL,
    subject,
    text: text + '\n' + email,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  console.log(email, subject, text);
  res.status(200).end();
});

module.exports = router;
