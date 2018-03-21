'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID
};
_firebase2.default.initializeApp(config);

var uploadImageAndGetUrl = function uploadImageAndGetUrl(req, res) {
  var imageFile = req.body.imageFile;

  var storageRef = _firebase2.default.storage().ref();
  var file = imageFile.imageFile;
  var metadata = {
    contentType: file[0].type
  };
  var uploadTask = storageRef.child('images/' + file[0].name).put(file[0], metadata);
  uploadTask.then(function (snapshot) {
    var imageUrl = snapshot.downloadURL;
    return res.status(200).send({ mesage: 'Image Uploaded', url: imageUrl });
  }).catch(function (error) {
    return res.status(500).send({ message: error });
  });
};
exports.default = uploadImageAndGetUrl;