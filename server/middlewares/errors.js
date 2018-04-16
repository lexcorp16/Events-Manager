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
  let errorMessage = '';
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
    errorMessage += 'Please fill in all fields \n';
  }
  if (new Date(date).toISOString() === 'Uncaught RangeError: Invalid time value at Date.toISOString') {
    errorMessage += 'invalid date fromat \n';
  }
  if (Number.isInteger(parseFloat(name)) || Number.isInteger(type)) {
    errorMessage += 'name and type fields cannot be digits or alphanumeric characters \n';
  }
  if (validator.isBefore(date)) {
    errorMessage += 'Invalid date \n';
  }
  if (errorMessage !== '') {
    return res.status(400).send({ error: errorMessage });
  }
  next();
};

const checkNullInputAddCenter = (req, res, next) => {
  let errorMessage = '';
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
    errorMessage += 'please fill in all fields \n';
  }
  if (alphaNumeric(capacity) || alphaNumeric(mobileNumber)) {
    errorMessage += 'capacity and mobileNumber fields can only be digits \n';
    return res.status(400).send({ error: errorMessage });
  }
  if (!Number.isInteger(parseFloat(mobileNumber)) || !Number.isInteger(parseFloat(capacity))) {
    errorMessage += 'capacity and mobileNumber fields can only be digits \n';
  }
  if (errorMessage !== '') {
    return res.status(400).send({ error: errorMessage });
  }
  next();
};

const checkNullInputModifyEvent = (req, res, next) => {
  let errorMessage = '';
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
    errorMessage += 'Please fill in all fields \n';
  }
  if (name) {
    if (Number.isInteger(parseFloat(name))) {
      errorMessage += 'name and type fields cannot be digits or alphanumeric characters \n';
    }
  }
  if (type) {
    if (Number.isInteger(parseFloat(type))) {
      errorMessage += 'name and type fields cannot be digits or alphanumeric characters';
    }
  }
  if (validator.isBefore(date)) {
    errorMessage += 'Invalid date';
  }
  if (errorMessage !== '') {
    return res.status(400).send({ error: errorMessage });
  }
  next();
};

const checkNullInputModifyCenter = (req, res, next) => {
  let errorMessage = '';
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
    errorMessage += 'please fill in all fields \n';
  }
  if (capacity) {
    if (alphaNumeric(capacity)) {
      errorMessage += 'capacity field can only be digits';
    }
  }
  if (mobileNumber) {
    if (alphaNumeric(mobileNumber)) {
      errorMessage += 'mobileNumber field can only be digits';
    }
  }
  if (mobileNumber) {
    if (!Number.isInteger(parseFloat(mobileNumber))) {
      errorMessage += 'mobileNumber field can only be digits \n';
    }
  }
  if (capacity) {
    if (!Number.isInteger(parseFloat(capacity))) {
      errorMessage += 'capacity field can only be digits \n';
    }
  }
  if (errorMessage !== '') {
    return res.status(400).send({ error: errorMessage });
  }
  next();
};

export default {
  checkNullInputAddEvent,
  checkNullInputAddCenter,
  checkNullInputModifyEvent,
  checkNullInputModifyCenter,
};
