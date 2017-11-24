'use strict';

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _centers = require('./routes/centers');

var _centers2 = _interopRequireDefault(_centers);

var _users = require('./routes/users');

var _users2 = _interopRequireDefault(_users);

var _events = require('./routes/events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

// Set up the express app
// require all dependencies
var app = (0, _express2.default)();

// Log requests to the console.
app.use((0, _morgan2.default)('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

// Setup a default catch-all route that sends back a welcome message in JSON format.
(0, _users2.default)(app);
(0, _centers2.default)(app);
(0, _events2.default)(app);

app.set('port', process.env.PORT || 3000);
app.get('*', function (req, res) {
  return res.status(200).send({
    message: 'Welcome to the beginning of nothingness.'
  });
});

// fire up server to listen on ap particular port
app.listen(app.get('port'), function () {
  console.log('api running on port ' + app.get('port'));
});

module.exports = app;