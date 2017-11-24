'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _center = require('../controllers/center');

var _center2 = _interopRequireDefault(_center);

var _auth = require('../middlewares/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
  app.get('/api', function (req, res) {
    res.status(200).send({ message: 'Welcome to the events-manager Api' });
  });
  app.post('/api/v1/centers', _auth2.default, _center2.default.addCenter);
  app.put('/api/v1/centers/:centerId', _auth2.default, _center2.default.modifyCenter);
  app.get('/api/v1/centers', _center2.default.getAllCenters);
  app.get('/api/v1/centers/:centerId', _center2.default.getACenter);
};