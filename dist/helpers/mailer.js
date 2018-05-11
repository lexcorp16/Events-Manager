'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

exports.default = function (mailOptions, res) {
  var transporter = _nodemailer2.default.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  transporter.sendMail(mailOptions, function (err) {
    if (err) return res.status(500).send({ error: 'oops, an error occured' });
    return res.status(200).send({ message: 'Event canceled and notification sent' });
  });
};