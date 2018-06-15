import validator from 'validator';

/**
 * checks if string is alphanumeric
 * @param {string} inputtxt string to be validated
 * @returns {boolean} value indicating if parameter is alphanumeric or not
 */
const alphaNumeric = (inputtxt) => {
  const letterNumber = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i;
  if (inputtxt.match(letterNumber)) {
    return true;
  }
  return false;
};
/**
 * Validates Create Center Data
 * @param {object} req request object from express/body-parser
 * @param {object} res response object from express
 * @param {function} next express next middleware function
 * @returns {object} response object in json
 */
const checkInvalidAddCenterDetails = (req, res, next) => {
  const errorMessage = [];
  const {
    name,
    type,
    capacity,
    mobileNumber,
    address,
    rentalCost,
  } = req.body;
  const matchingDetails = {
    0: 'name',
    1: 'type',
    2: 'capacity',
    3: 'mobileNumber',
    4: 'address',
    5: 'rentalCost',
  };
  const centerDetails = [
    name, type, capacity, mobileNumber, address, rentalCost
  ];
  for (let counter = -1; counter < centerDetails.length - 1;) {
    counter += 1;
    if (centerDetails[counter] === undefined) {
      errorMessage.push(`${matchingDetails[counter]} is required`);
    }
    if (centerDetails[counter] !== undefined) {
      if (centerDetails[counter].trim() === '') {
        errorMessage.push(`${matchingDetails[counter]} cannot be empty`);
      }
    }
  }

  if (!req.body.facilities) {
    errorMessage.push('Please specify facilities');
  }
  if (capacity && capacity.trim() !== '') {
    if (!Number.isInteger(parseFloat(capacity))) {
      errorMessage.push('capacity field can only be digits');
    }
    if (alphaNumeric(capacity)) {
      errorMessage.push('capacity cannot be alphanumeric');
    }
  }
  if (mobileNumber && mobileNumber.trim() !== '') {
    if (!Number.isInteger(parseFloat(mobileNumber))) {
      errorMessage.push('mobileNumber field can only be digits');
    }
    if (alphaNumeric(mobileNumber)) {
      errorMessage.push('mobileNumber cannot be alphanumeric');
    }
    if (mobileNumber.length !== 11) {
      errorMessage.push('invalid mobileNumber');
    }
  }
  if (errorMessage.length !== 0) {
    return res.status(400).send({ error: errorMessage });
  }
  next();
};

/**
 * Validates Modify Center Data
 * @param {object} req request object from express/body-parser
 * @param {object} res response object from express
 * @param {function} next express next middleware function
 * @returns {object} response object in json
 */
const checkInvalidModifyCenterDetails = (req, res, next) => {
  const errorMessage = [];
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
    if (value !== undefined) {
      if (value.trim() < 1) {
        isNull = true;
      }
    }
  });
  if (isNull) {
    errorMessage.push('Fields to be modified should not be empty');
  }
  if (capacity) {
    if (!Number.isInteger(parseFloat(capacity))) {
      errorMessage.push('capacity field can only be digits');
    }
    if (alphaNumeric(capacity)) {
      errorMessage.push('capacity cannot be alphanumeric');
    }
  }
  if (mobileNumber) {
    if (!Number.isInteger(parseFloat(mobileNumber))) {
      errorMessage.push('mobileNumber field can only be digits');
    }
    if (alphaNumeric(mobileNumber)) {
      errorMessage.push('mobileNumber cannot be alphanumeric');
    }
    if (mobileNumber.length !== 11) {
      errorMessage.push('invalid mobileNumber');
    }
  }
  if (errorMessage.length !== 0) {
    return res.status(400).send({ error: errorMessage });
  }
  next();
};

/**
 * Validates centerId parameter
 * @param {object} req request object from express/body-parser
 * @param {object} res response object from express
 * @param {function} next express next middleware function
 * @returns {object} response object in json
 */
const checkInvalidCenterParams = (req, res, next) => {
  if (!validator.isUUID(req.params.centerId, 4)) {
    return res.status(400).send({ error: 'Invalid id supplied' });
  }
  next();
};

export {
  checkInvalidAddCenterDetails,
  checkInvalidModifyCenterDetails,
  checkInvalidCenterParams,
};
