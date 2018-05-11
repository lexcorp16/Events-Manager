'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _models = require('../db/models');

var _models2 = _interopRequireDefault(_models);

var _admin = require('../helpers/admin');

var _admin2 = _interopRequireDefault(_admin);

var _errorSender = require('../helpers/errorSender');

var _errorSender2 = _interopRequireDefault(_errorSender);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var secret = process.env.SECRET;

var Users = _models2.default.Users;
/**
 * contains logic for user related endpoints
 * @class User
 *
 */

var User = function () {
  function User() {
    _classCallCheck(this, User);
  }

  _createClass(User, null, [{
    key: 'signup',

    /**
     * SignUp a User
     * @param {object} req The request body of the request.
     * @param {object} res The response body.
     * @returns {object} res.
     * signs up new user
     */
    value: function signup(req, res) {
      var _req$body = req.body,
          firstname = _req$body.firstname,
          lastname = _req$body.lastname;

      var email = req.body.email.toLowerCase();
      // creates a User,generate a token and hash the password
      if (email === process.env.ADMIN_EMAIL) {
        return (0, _admin2.default)(req, res);
      }
      _bcrypt2.default.hash(req.body.password, 10, function (err, hash) {
        if (err) {
          return res.status(500).send({ error: err.message });
        }
        var password = hash;
        return Users.create({
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password
        }).then(function (user) {
          var userDetails = {
            userId: user.id
          };
          var token = _jsonwebtoken2.default.sign(userDetails, secret, {
            expiresIn: '100h' // expires in 1 hours
          });
          return res.status(201).send({ message: 'You have successfully signed up', token: token });
        }).catch(function (error) {
          return (0, _errorSender2.default)(error, res, false);
        });
      });
    }
    /**
    * SignIn a User
    * @param {object} req The request body of the request.
    * @param {object} res The response body.
    * @returns {object} res.
    * signs in new user
    */

  }, {
    key: 'signin',
    value: function signin(req, res) {
      var password = req.body.password;

      var email = req.body.email.toLowerCase();
      return Users.findOne({
        where: {
          email: email.trim()
        }
      }).then(function (user) {
        if (!user) {
          return res.status(400).send({ error: 'Invalid email or password' });
        }
        return _bcrypt2.default.compare(password, user.password, function (err, response) {
          if (response) {
            var userDetails = {
              userId: user.id
            };
            var token = _jsonwebtoken2.default.sign(userDetails, secret, {
              expiresIn: '100h' // expires in 1 hours
            });
            return res.status(200).send({ message: 'You have successfully logged in', token: token });
          }
          return res.status(400).send({ error: 'Invalid email or password' });
        });
      }).catch(function (error) {
        return (0, _errorSender2.default)(error, res, false);
      });
    }
    /**
    * Make A User an Admin
    * @param {object} req The request body of the request.
    * @param {object} res The response body.
    * @returns {object} res.
    */

  }, {
    key: 'upgradeUserToAdmin',
    value: function upgradeUserToAdmin(req, res) {
      Users.findById(req.params.userId).then(function (user) {
        user.updateAttributes({
          role: 'Admin'
        });
        return res.status(202).send({ message: 'Admin User successfully created' });
      }).catch(function (error) {
        return (0, _errorSender2.default)(error, res, false);
      });
    }
  }]);

  return User;
}();

exports.default = User;