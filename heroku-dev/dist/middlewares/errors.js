'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var alphaNumeric = function alphaNumeric(inputtxt) {
  var letterNumber = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i;
  if (inputtxt.match(letterNumber)) {
    return true;
  }
  return false;
};

var checkNullInputAddEvent = function checkNullInputAddEvent(req, res, next) {
  var isNull = void 0;
  var _req$body = req.body,
      name = _req$body.name,
      type = _req$body.type,
      center = _req$body.center,
      date = _req$body.date;

  [name, type, center, date].forEach(function (input) {
    if (!input || input.trim() < 1) {
      isNull = true;
    }
  });
  if (isNull) {
    return res.status(400).send({ error: 'Please fill in all fields' });
  }
  if (new Date(date).toISOString() === 'Uncaught RangeError: Invalid time value at Date.toISOString') {
    return res.status(400).send({ error: 'invalid date fromat' });
  }
  if (Number.isInteger(parseFloat(name)) || Number.isInteger(type)) {
    return res.status(400).send({ error: 'name and type fields cannot be digits or alphanumeric characters' });
  }

  next();
};

var checkNullInputAddCenter = function checkNullInputAddCenter(req, res, next) {
  var isNull = void 0;
  var _req$body2 = req.body,
      name = _req$body2.name,
      type = _req$body2.type,
      capacity = _req$body2.capacity,
      mobileNumber = _req$body2.mobileNumber,
      address = _req$body2.address;

  [name, type, capacity, mobileNumber, address].forEach(function (input) {
    if (!input || input.trim() < 1) {
      isNull = true;
    }
  });
  if (isNull) {
    return res.status(400).send({ error: 'please fill in all fields' });
  }
  if (alphaNumeric(capacity) || alphaNumeric(mobileNumber)) {
    return res.status(400).send({ error: 'capacity and mobileNumber fields can only be digits' });
  }
  if (!Number.isInteger(parseFloat(mobileNumber)) || !Number.isInteger(parseFloat(capacity))) {
    return res.status(400).send({ error: 'capacity and mobileNumber fields can only be digits' });
  }

  next();
};

var checkNullInputModifyEvent = function checkNullInputModifyEvent(req, res, next) {
  var isNull = void 0;
  var modifiedParams = [];
  var _req$body3 = req.body,
      name = _req$body3.name,
      type = _req$body3.type,
      center = _req$body3.center,
      date = _req$body3.date;

  [name, type, center, date].forEach(function (input) {
    if (input) {
      modifiedParams.push(input);
    }
  });

  modifiedParams.forEach(function (value) {
    if (value.trim() < 1) {
      isNull = true;
    }
  });
  if (isNull) {
    return res.status(400).send({ error: 'Please fill in all fields' });
  }
  if (name) {
    if (Number.isInteger(parseFloat(name))) {
      return res.status(400).send({ error: 'name and type fields cannot be digits or alphanumeric characters' });
    }
  }
  if (type) {
    if (Number.isInteger(parseFloat(type))) {
      return res.status(400).send({ error: 'name and type fields cannot be digits or alphanumeric characters' });
    }
  }

  next();
};

var checkNullInputModifyCenter = function checkNullInputModifyCenter(req, res, next) {
  var modifiedParams = [];
  var isNull = void 0;
  var _req$body4 = req.body,
      name = _req$body4.name,
      type = _req$body4.type,
      capacity = _req$body4.capacity,
      mobileNumber = _req$body4.mobileNumber,
      address = _req$body4.address;

  [name, type, capacity, mobileNumber, address].forEach(function (input) {
    if (input) {
      modifiedParams.push(input);
    }
  });
  modifiedParams.forEach(function (value) {
    if (value.trim() < 1) {
      isNull = true;
    }
  });
  if (isNull) {
    return res.status(400).send({ error: 'please fill in all fields' });
  }
  if (capacity) {
    if (alphaNumeric(capacity)) {
      return res.status(400).send({ error: 'capacity field can only be digits' });
    }
  }
  if (mobileNumber) {
    if (alphaNumeric(mobileNumber)) {
      return res.status(400).send({ error: 'mobileNumber field can only be digits' });
    }
  }
  if (mobileNumber) {
    if (!Number.isInteger(parseFloat(mobileNumber))) {
      return res.status(400).send({ error: 'mobileNumber field can only be digits' });
    }
  }
  if (capacity) {
    if (!Number.isInteger(parseFloat(capacity))) {
      return res.status(400).send({ error: 'capacity field can only be digits' });
    }
  }
  next();
};

exports.default = {
  checkNullInputAddEvent: checkNullInputAddEvent,
  checkNullInputAddCenter: checkNullInputAddCenter,
  checkNullInputModifyEvent: checkNullInputModifyEvent,
  checkNullInputModifyCenter: checkNullInputModifyCenter
};