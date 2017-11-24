const alphaNumeric = (inputtxt) => {
  const letterNumber = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i;
  if (inputtxt.match(letterNumber)) {
    return true;
  }
  return false;
};

const checkInvalidInputAddCenter = (req, res, next) => {
  if (req.method !== 'POST') {
    return res.status(300).send({ message: 'Invalid request method' });
  }
  let isUndefined = false;
  let isNull = false;
  let isString = true;
  const {
    name,
    type,
    capacity,
    location,
    address,
    mobileNumber,
  } = req.body;
  [name, type, location, capacity, address, mobileNumber].forEach((info) => {
    if (info === undefined) {
      isUndefined = true;
    }
    if (!isUndefined && !alphaNumeric(info)) {
      if (Number.isInteger(parseFloat(info))) {
        isString = false;
      }
    }
    if (!isUndefined) {
      if (info.trim().length < 1) {
        isNull = true;
      }
    }
  });
  if (isUndefined) {
    return res.status(400).send({ error: 'Please fill in all fields' });
  }
  if (isNull) {
    return res.status(400).send({ error: 'Please fill in all fields' });
  }
  next();
};

const checkInvalidInputAddEvent = (req, res, next) => {
  if (req.method !== 'POST') {
    return res.status(300).send({ message: 'Invalid request method' });
  }
  let isUndefined = false;
  let isNull = false;
  let isString = true;
  const {
    name,
    type,
    location,
    centerId,
    date,
  } = req.body;
  [name, type, location, centerId, date].forEach((info) => {
    if (info === undefined) {
      isUndefined = true;
    }
    if (!isUndefined && !alphaNumeric(info)) {
      if (Number.isInteger(parseFloat(info))) {
        isString = false;
      }
    }
    if (!isUndefined) {
      if (info.trim().length < 1) {
        isNull = true;
      }
    }
  });
  if (isUndefined) {
    return res.status(400).send({ error: 'Please fill in all fields' });
  }
  if (isNull) {
    return res.status(400).send({ error: 'Please fill in all fields' });
  }
  next();
};

const checkInvalidModification = (req, res, next) => {
  const {
    name,
    category,
    description,
    ingredients,
  } = req.body;
  const modifiedFields = [];
  let isUndefined = false;
  let isNull = false;
  let isString = true;
  [name, category, description, ingredients].forEach((field) => {
    if (field !== undefined) {
      modifiedFields.push(field);
    }
  });
  if (modifiedFields.length === 0) {
    return res.status(400).send({ error: 'Please fill in the properties you want to modify' });
  }
  modifiedFields.forEach((info) => {
    if (info === undefined) {
      isUndefined = true;
    }
    if (!isUndefined && !alphaNumeric(info)) {
      if (Number.isInteger(parseFloat(info))) {
        isString = false;
      }
    }
    if (!isUndefined) {
      if (info.trim().length < 1) {
        isNull = true;
      }
    }
  });
  if (isUndefined) {
    return res.status(400).send({ error: 'Please fill in all fields' });
  }
  if (isNull) {
    return res.status(400).send({ error: 'A field does not contain any input' });
  }
  if (!isString) {
    return res.status(400).send({ error: 'Only texts can be inputed' });
  }
  next();
};

export default {
  checkInvalidInputAddCenter,
  checkInvalidInputAddEvent,
  checkInvalidModification,
};
