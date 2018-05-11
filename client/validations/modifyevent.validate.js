import validator from 'validator';

const checkInvalidModifyEventDetails = (req) => {
  const errorMessage = [];
  const modifiedParams = [];
  const {
    name,
    type,
    center,
    date,
  } = req;
  [name, type, center, date].forEach((input) => {
    if (input) {
      modifiedParams.push(input);
    }
  });
  if (!date) {
    errorMessage.push('Please specify date first');
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
      errorMessage.push('The date chosen is past, please choose another date');
    }
    if (validator.toDate(date) === null) {
      errorMessage.push('invalid date');
    }
  }
  if (errorMessage.length !== 0) {
    return errorMessage;
  }
  return true;
};

export default checkInvalidModifyEventDetails;
