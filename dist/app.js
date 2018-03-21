'use strict';

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack3 = require('../webpack.config');

var _webpack4 = _interopRequireDefault(_webpack3);

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
var compiler = (0, _webpack2.default)(_webpack4.default);

// Log requests to the console.
app.use((0, _morgan2.default)('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use((0, _cors2.default)({ credentials: true, origin: true }));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
// Setup a default catch-all route that sends back a welcome message in JSON format.
(0, _users2.default)(app);
(0, _centers2.default)(app);
(0, _events2.default)(app);

app.set('port', process.env.PORT || 3000);

app.use((0, _webpackDevMiddleware2.default)(compiler, {
  hot: true,
  publicPath: _webpack4.default.output.publicPath,
  noInfo: true
}));
app.use((0, _webpackHotMiddleware2.default)(compiler));

app.get('/*', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, '../client/index.html'));
});

// fire up server to listen on ap particular port
app.listen(app.get('port'), function () {
  console.log('api running on port ' + app.get('port'));
});

module.exports = app;