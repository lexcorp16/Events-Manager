'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var secret = process.env.SECRET;

var verifyToken = function verifyToken(req, res, next) {
  var token = req.headers.auth || req.headers['x-access-token'];
  if (token) {
    _jsonwebtoken2.default.verify(token, secret, function (err, decoded) {
      if (err) {
        return res.status(400).send({ error: 'Oops,Your session has expired,please login again to more-recipes' });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(403).send({ error: 'You have to login First' });
  }
};

exports.default = verifyToken;