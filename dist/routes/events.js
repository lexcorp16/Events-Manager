'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('../controllers/events');

var _events2 = _interopRequireDefault(_events);

var _auth = require('../middlewares/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
  app.post('/api/v1/events/', _auth2.default, _events2.default.addEvent);
  app.put('/api/v1/events/:eventId', _auth2.default, _events2.default.modifyEvent);
  app.delete('/api/v1/events/:eventId', _auth2.default, _events2.default.deleteEvent);
  app.get('/api/v1/events/user', _auth2.default, _events2.default.getUserEvents);
};