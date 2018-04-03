import validator from 'validator';

const alphaNumeric = (inputtxt) => {
  const letterNumber = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i;
  if (inputtxt.match(letterNumber)) {
    return true;
  }
  return false;
};

const checkNullInputAddEvent = (req, res, next) => {
  let isNull;
  const {
    name,
    type,
    center,
    date,
  } = req.body;
  [name, type, center, date].forEach((input) => {
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
  if (validator.isBefore(date)) {
    return res.status(400).send({ error: 'Invalid date' });
  }
  next();
};

const checkNullInputAddCenter = (req, res, next) => {
  let isNull;
  const {
    name,
    type,
    capacity,
    mobileNumber,
    address,
  } = req.body;
  [name, type, capacity, mobileNumber, address].forEach((input) => {
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

const checkNullInputModifyEvent = (req, res, next) => {
  let isNull;
  const modifiedParams = [];
  const {
    name,
    type,
    center,
    date,
  } = req.body;
  [name, type, center, date].forEach((input) => {
    if (input) {
      modifiedParams.push(input);
    }
  });

  modifiedParams.forEach((value) => {
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
  if (validator.isBefore(date)) {
    return res.status(400).send({ error: 'Invalid date' });
  }
  next();
};

const checkNullInputModifyCenter = (req, res, next) => {
  const modifiedParams = [];
  let isNull;
  const {
    name,
    type,
    capacity,
    mobileNumber,
    address,
  } = req.body;
  [name, type, capacity, mobileNumber, address].forEach((input) => {
    if (input) {
      modifiedParams.push(input);
    }
  });
  modifiedParams.forEach((value) => {
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

export default {
  checkNullInputAddEvent,
  checkNullInputAddCenter,
  checkNullInputModifyEvent,
  checkNullInputModifyCenter,
};
