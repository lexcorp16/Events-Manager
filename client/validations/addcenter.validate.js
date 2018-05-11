const alphaNumeric = (inputtxt) => {
  const letterNumber = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i;
  if (inputtxt.match(letterNumber)) {
    return true;
  }
  return false;
};

const checkInvalidAddCenterDetails = (req) => {
  const errorMessage = [];
  const {
    name,
    type,
    capacity,
    mobileNumber,
    address,
    rentalCost,
  } = req;
  const matchingDetails = {
    0: 'name',
    1: 'type',
    2: 'capacity',
    3: 'mobileNumber',
    4: 'address',
    5: 'rentalCost',
  };
  const centerDetails = [name, type, capacity, mobileNumber, address, rentalCost];
  // centerDetails.forEach((input) => {
  //   if (!input) {
  //     errorMessage += 'Please fill in all fields \n';
  //   }
  // });
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

  if (!req.facilities || req.facilities.length === 0) {
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
    return errorMessage;
  }
  return true;
};

export default checkInvalidAddCenterDetails;
