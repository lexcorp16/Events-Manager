import validator from 'validator';

const checkInvalidAddEventDetails = (req) => {
  const errorMessage = [];
  const {
    name,
    type,
    center,
    startDate,
    endDate,
  } = req;
  const eventDetails = [name, type, center, startDate, endDate];
  const matchingDetails = {
    0: 'name',
    1: 'type',
    2: 'center',
    3: 'startDate',
    4: 'endDate',
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
  if (startDate) {
    if (startDate.trim() !== '' && validator.isBefore(startDate)) {
      errorMessage.push('The commencement date chosen is past, please choose another date');
    }
    if (validator.toDate(startDate) === null) {
      errorMessage.push('invalid date');
    }
  }
  if (endDate) {
    if (endDate.trim() !== '' && validator.isBefore(endDate)) {
      errorMessage.push('The end date chosen is past, please choose another date');
    }
    if (validator.toDate(endDate) === null) {
      errorMessage.push('invalid date');
    }
  }
  if (startDate > endDate) {
    errorMessage.push('The commencement date should come before the end date');
  }
  if (errorMessage.length !== 0) {
    return errorMessage;
  }
  return true;
};

export default checkInvalidAddEventDetails;
