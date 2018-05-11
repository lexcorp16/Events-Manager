'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _users = require('../controllers/users');

var _users2 = _interopRequireDefault(_users);

var _users3 = require('../middlewares/users');

var _users4 = _interopRequireDefault(_users3);

var _auth = require('../middlewares/auth');

var _auth2 = _interopRequireDefault(_auth);

var _superAdminCheck = require('../helpers/superAdminCheck');

var _superAdminCheck2 = _interopRequireDefault(_superAdminCheck);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
  app.post('/api/v1/users', _users4.default.checkInvalidUserDetails, _users2.default.signup);
  app.post('/api/v1/users/signin', _users4.default.checkInvalidUserSignIn, _users2.default.signin);
  app.put('/api/v1/users/:userId', _auth2.default, _superAdminCheck2.default, _users2.default.upgradeUserToAdmin);
};