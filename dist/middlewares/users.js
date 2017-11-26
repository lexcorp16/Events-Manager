'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var isValidEmail = function isValidEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([ \.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
};

var checkInvalidUserDetails = function checkInvalidUserDetails(req, res, next) {
  var _req$body = req.body,
      firstname = _req$body.firstname,
      lastname = _req$body.lastname,
      email = _req$body.email,
      password = _req$body.password,
      confirmpassword = _req$body.confirmpassword;

  var matchingDetails = {
    0: 'firstname',
    1: 'lastname',
    2: 'email',
    3: 'password',
    4: 'confirmpassword'
  };
  var reqBody = [firstname, lastname, email, password, confirmpassword];
  var undefinedBody = void 0;
  var isNull = false;
  var isDigit = false;
  for (var i = 0; i < reqBody.length; i += 1) {
    if (reqBody[i] === undefined) {
      undefinedBody = matchingDetails[i];
      break;
    }
    if (!undefinedBody) {
      if (reqBody[i].trim().length < 1) {
        isNull = true;
      }
    }
  }

  [firstname, lastname].forEach(function (field) {
    if (!undefinedBody && Number.isInteger(parseFloat(field))) {
      isDigit = true;
    }
  });

  if (undefinedBody) {
    return res.status(400).send({ error: 'Please input ' + undefinedBody });
  }
  if (isNull) {
    return res.status(400).send({ error: 'Please fill in all input field' });
  }
  if (req.body.password.length < 6) {
    return res.status(400).send({ error: 'password must be at least six characters long' });
  }
  if (!isValidEmail(email.toLowerCase())) {
    return res.status(400).send({ error: 'Invalid email format' });
  }
  if (isDigit) {
    return res.status(400).send({ error: 'Your names cannot be digits only' });
  }
  if (password !== confirmpassword) {
    return res.status(400).send({ error: 'password and confirmpassword are not equal' });
  }
  next();
};

var checkInvalidUserSignIn = function checkInvalidUserSignIn(req, res, next) {
  if (req.body.email === undefined) {
    return res.status(400).send({ error: 'Please Input email' });
  }
  if (req.body.password === undefined) {
    return res.status(400).send({ error: 'Please Input password' });
  }
  if (req.body.email.trim().length < 1) {
    return res.status(400).send({ error: 'Please fill in all input fields' });
  }
  if (!isValidEmail(req.body.email)) {
    return res.status(400).send({ error: 'Invalid email format' });
  }
  if (req.body.email.trim().length < 1) {
    return res.status(400).send({ error: 'Please fill in all input fields' });
  }
  next();
};

exports.default = {
  checkInvalidUserDetails: checkInvalidUserDetails,
  checkInvalidUserSignIn: checkInvalidUserSignIn
};