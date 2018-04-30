import validator from 'validator';

const checkInvalidAddEventDetails = (req, res, next) => {
  let isUndefined;
  let errorMessage = '';
  const {
    name,
    type,
    center,
    date,
  } = req.body;
  const eventDetails = [name, type, center, date];
  eventDetails.forEach((input) => {
    if (!input) {
      isUndefined = true;
    }
  });
  const matchingDetails = {
    0: 'name',
    1: 'type',
    2: 'center',
    3: 'date',
  };
  for (let counter = -1; counter < eventDetails.length - 1;) {
    counter += 1;
    if (eventDetails[counter].trim === '') {
      errorMessage += `${matchingDetails[counter]} cannot be empty \n`;
    }
  }
  if (isUndefined) {
    errorMessage += 'Please fill in all fields \n';
  }
  if (name) {
    if (Number.isInteger(parseFloat(name))) {
      errorMessage += 'name field cannot be digits or alphanumeric characters \n';
    }
  }
  if (type) {
    if (Number.isInteger(parseFloat(type))) {
      errorMessage += 'type field cannot be digits or alphanumeric characters \n';
    }
  }
  if (date) {
    if (validator.isBefore(date)) {
      return res.status(406).send({ error: 'The date chosen is past, please choose another date \n' });
    }
    if (validator.toDate(date) === null) {
      errorMessage += 'invalid date \n';
    }
  }
  if (errorMessage !== '') {
    return res.status(400).send({ error: errorMessage });
  }
  next();
};

const checkInvalidModifyEventDetails = (req, res, next) => {
  let errorMessage = '';
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
  if (!date) {
    return res.status(400).send({ error: 'Please specify date' });
  }
  if (name) {
    if (name.trim() === '') {
      errorMessage += 'name field cannot be empty';
    }
    if (Number.isInteger(parseFloat(name))) {
      errorMessage += 'name cannot be digits or alphanumeric characters \n';
    }
  }
  if (type) {
    if (type.trim() === '') {
      errorMessage += 'name field cannot be empty';
    }
    if (Number.isInteger(parseFloat(type))) {
      errorMessage += 'type fields cannot be digits or alphanumeric characters \n';
    }
  }
  if (date) {
    if (validator.isBefore(date)) {
      return res.status(406).send({ error: 'The date chosen is past, please choose another date \n' });
    }
    if (validator.toDate(date) === null) {
      errorMessage += 'invalid date \n';
    }
  }
  if (errorMessage !== '') {
    return res.status(400).send({ error: errorMessage });
  }
  next();
};

const checkInvalidEventParams = (req, res, next) => {
  if (!validator.isUUID(req.params.eventId, 4)) {
    return res.status(400).send({ error: 'Invalid id supplied' });
  }
  next();
};

export {
  checkInvalidAddEventDetails,
  checkInvalidModifyEventDetails,
  checkInvalidEventParams,
};
