const express = require('express');
const router = express.Router();
var nodemailer = require('nodemailer'); // This doesn't work with heroku, but works on other platforms. 

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

router.use(express.json());

router.post('/', (req, res) => {

  const { email, subject, message } = req.body;
  console.log(email, subject, message)
  // const mailOptions = {
  //   from: email,
  //   to: process.env.EMAIL,
  //   subject,
  //   text: text + '\n' + email,
  // };

  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (err) {
  //     console.error(err);
  //   } else {
  //     console.log('Email sent: ' + info.response);
  //   }
  // });
  res.end();
});

module.exports = router;
