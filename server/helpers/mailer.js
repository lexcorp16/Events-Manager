import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export default (mailOptions, res) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  transporter.sendMail(mailOptions, (err) => {
    if (err) return res.status(500).send({ error: 'oops, an error occured' });
    return res.status(200).send({ message: 'Event canceled and notification sent' });
  });
};
