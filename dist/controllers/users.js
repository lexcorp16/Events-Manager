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

var _trim = require('../helpers/trim');

var _trim2 = _interopRequireDefault(_trim);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var secret = process.env.SECRET;

var Users = _models2.default.Users;

/**
* @User, class containing all methods that
* handle center related api endpoint
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
     */
    value: function signup(req, res) {
      var _req$body = req.body,
          firstname = _req$body.firstname,
          lastname = _req$body.lastname;

      var email = req.body.email.toLowerCase();
      // check if another user with same mail already exists
      Users.findOne({
        where: {
          email: email.trim()
        }
      }).then(function (user) {
        if (user) {
          return res.status(400).send({ error: 'Another user with this email already exists' });
        }
      }).catch(function (error) {
        return res.status(500).send({ error: error.message });
      });
      // creates a User,generate a token and hash the password
      if (email === 'efosaokpugie@gmail.com') {
        return (0, _admin2.default)(res);
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
          var payload = {
            userId: user.id,
            role: user.role,
            firstname: firstname,
            lastname: lastname
          };
          var token = _jsonwebtoken2.default.sign(payload, secret, {
            expiresIn: '10h' // expires in 1 hours
          });
          return res.status(201).send({ message: 'You have successfully signed up', token: token, user: user });
        }).catch(function (error) {
          return res.status(500).send({ error: error.message });
        });
      });
    }
    /**
    * SignIn a User
    * @param {object} req The request body of the request.
    * @param {object} res The response body.
    * @returns {object} res.
    */

  }, {
    key: 'signin',
    value: function signin(req, res) {
      var password = req.body.password;

      var email = req.body.email.toLowerCase();
      (0, _trim2.default)([email, password]);
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
            var payload = {
              userId: user.id,
              firstname: user.firstname,
              lastname: user.lastname,
              role: user.role
            };
            var token = _jsonwebtoken2.default.sign(payload, secret, {
              expiresIn: '10h' // expires in 1 hours
            });
            return res.status(200).send({ message: 'You have successfully logged in', token: token, user: user });
          }
          return res.status(400).send({ error: 'Invalid email or password' });
        });
      }).catch(function () {
        return res.status(500).send({ error: 'an error occurred' });
      });
    }
    /**
    * Make A User an Admin
    * @param {object} req The request body of the request.
    * @param {object} res The response body.
    * @returns {object} res.
    */

  }, {
    key: 'becomeAdmin',
    value: function becomeAdmin(req, res) {
      if (req.decoded.role !== 'SuperAdmin') {
        return res.status(403).send({ error: 'You are not authorised to perform this action' });
      }
      Users.findById(req.params.userId).then(function (user) {
        user.updateAttributes({
          role: 'Admin'
        });
        return res.status(202).send({ message: 'Admin User successfully created' });
      }).catch(function (error) {
        return res.status(500).send({ error: error.message });
      });
    }
  }]);

  return User;
}();

exports.default = User;