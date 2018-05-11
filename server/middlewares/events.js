import validator from 'validator';

const checkInvalidAddEventDetails = (req, res, next) => {
  const errorMessage = [];
  const {
    name,
    type,
    center,
    date,
  } = req.body;
  const eventDetails = [name, type, center, date];
  const matchingDetails = {
    0: 'name',
    1: 'type',
    2: 'center',
    3: 'date',
  };
  for (let counter = -1; counter < eventDetails.length - 1;) {
    counter += 1;
    if (eventDetails[counter] === undefined) {
      errorMessage.push(`${matchingDetails[counter]} is required`);
    }
    if (eventDetails[counter] !== undefined) {
      if (eventDetails[counter].trim() === '') {
        errorMessage.push(`${matchingDetails[counter]} cannot be empty`);
      }
    }
  }
  if (name) {
    if (name.trim() !== '' && Number.isInteger(parseFloat(name))) {
      errorMessage.push('name field cannot be digits or alphanumeric characters');
    }
  }
  if (type) {
    if (type.trim() !== '' && Number.isInteger(parseFloat(type))) {
      errorMessage.push('type field cannot be digits or alphanumeric characters');
    }
  }
  if (date) {
    if (date.trim() !== '' && validator.isBefore(date)) {
      return res.status(406).send({ error: 'The date chosen is past, please choose another date' });
    }
    if (validator.toDate(date) === null) {
      errorMessage.push('invalid date');
    }
  }
  if (errorMessage.length !== 0) {
    return res.status(400).send({ error: errorMessage });
  }
  next();
};

const checkInvalidModifyEventDetails = (req, res, next) => {
  const errorMessage = [];
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
    return res.status(400).send({ error: 'Please specify date first' });
  }
  if (name) {
    if (name.trim() === '') {
      errorMessage.push('name field cannot be empty');
    }
    if (Number.isInteger(parseFloat(name))) {
      errorMessage.push('name cannot be digits or alphanumeric characters');
    }
  }
  if (type) {
    if (type.trim() === '') {
      errorMessage.push('name field cannot be empty');
    }
    if (Number.isInteger(parseFloat(type))) {
      errorMessage.push('type fields cannot be digits or alphanumeric characters');
    }
  }
  if (date) {
    if (date.trim() !== '' && validator.isBefore(date)) {
      return res.status(406).send({ error: 'The date chosen is past, please choose another date' });
    }
    if (validator.toDate(date) === null) {
      errorMessage.push('invalid date');
    }
  }
  if (errorMessage.length !== 0) {
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
