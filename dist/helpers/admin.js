'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _models = require('../db/models');

var _models2 = _interopRequireDefault(_models);

var _errorSender = require('./errorSender');

var _errorSender2 = _interopRequireDefault(_errorSender);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Users = _models2.default.Users;


var secret = process.env.SECRET;

exports.default = function (req, res) {
  _bcrypt2.default.hash(req.body.password, 10, function (err, hash) {
    Users.create({
      email: 'efosaokpugie@gmail.com',
      firstname: 'Efosa',
      lastname: 'Okpugie',
      password: hash,
      role: 'SuperAdmin'
    }).then(function (superAdmin) {
      var payload = {
        userId: superAdmin.id,
        firstname: superAdmin.firstname,
        lastname: superAdmin.lastname,
        role: superAdmin.role
      };
      var token = _jsonwebtoken2.default.sign(payload, secret, {
        expiresIn: '10h'
      });
      return res.status(201).send({ message: 'SuperAdmin created', token: token });
    }).catch(function (error) {
      return (0, _errorSender2.default)(error, res, false);
    });
  });
};