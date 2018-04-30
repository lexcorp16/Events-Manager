import validator from 'validator';

const alphaNumeric = (inputtxt) => {
  const letterNumber = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i;
  if (inputtxt.match(letterNumber)) {
    return true;
  }
  return false;
};

const checkInvalidAddCenterDetails = (req, res, next) => {
  let errorMessage = '';
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
  const centerDetails = [name, type, capacity, mobileNumber, address, rentalCost];
  centerDetails.forEach((input) => {
    if (!input) {
      errorMessage += 'Please fill in all fields \n';
    }
  });
  for (let counter = -1; counter < centerDetails.length - 1;) {
    counter += 1;
    if (centerDetails[counter]) {
      if (centerDetails[counter].trim() === '') {
        errorMessage += `${matchingDetails[counter]} cannot be empty \n`;
      }
    }
  }

  if (!req.body.facilities) {
    errorMessage += 'Please specify facilities \n';
  }
  if (!req.body.rentalCost) {
    errorMessage += 'Please specify rentalCost \n';
  }
  if (capacity) {
    if (!Number.isInteger(parseFloat(capacity))) {
      errorMessage += 'capacity field can only be digits \n';
    }
    if (alphaNumeric(capacity)) {
      errorMessage += 'capacity cannot be alphanumeric \n';
    }
  }
  if (mobileNumber) {
    if (!Number.isInteger(parseFloat(mobileNumber))) {
      errorMessage += 'mobileNumber field can only be digits \n';
    }
    if (alphaNumeric(mobileNumber)) {
      errorMessage += 'mobileNumber cannot be alphanumeric \n';
    }
    if (mobileNumber.length !== 11) {
      errorMessage += 'invalid mobileNumber';
    }
  }
  if (errorMessage !== '') {
    return res.status(400).send({ error: errorMessage });
  }
  next();
};

const checkInvalidModifyCenterDetails = (req, res, next) => {
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
    if (!Number.isInteger(parseFloat(capacity))) {
      errorMessage += 'capacity field can only be digits \n';
    }
    if (alphaNumeric(capacity)) {
      errorMessage += 'capacity cannot be alphanumeric \n';
    }
  }
  if (mobileNumber) {
    if (!Number.isInteger(parseFloat(mobileNumber))) {
      errorMessage += 'mobileNumber field can only be digits \n';
    }
    if (alphaNumeric(mobileNumber)) {
      errorMessage += 'mobileNumber cannot be alphanumeric \n';
    }
    if (mobileNumber.length !== 11) {
      errorMessage += 'invalid mobileNumber';
    }
  }
  if (errorMessage !== '') {
    return res.status(400).send({ error: errorMessage });
  }
  next();
};

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
