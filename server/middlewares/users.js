const isValidEmail = (mail) => {
  if (/^\w+([\.-]?\w+)*@\w+([ \.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
};

const checkInvalidUserDetails = (req, res, next) => {
  const {
    firstname,
    lastname,
    email,
    password,
    confirmpassword,
  } = req.body;
  const matchingDetails = {
    0: 'firstname',
    1: 'lastname',
    2: 'email',
    3: 'password',
    4: 'confirmpassword',
  };
  const reqBody = [firstname, lastname, email, password, confirmpassword];
  let errorMessage = '';
  let undefinedBody;
  let isNull = false;
  let isDigit = false;
  for (let i = 0; i < reqBody.length; i += 1) {
    if (!reqBody[i]) {
      undefinedBody = matchingDetails[i];
      errorMessage += `Please input ${undefinedBody} \n`;
    }
    if (!undefinedBody) {
      if (reqBody[i].trim().length < 1) {
        isNull = true;
      }
    }
  }

  [firstname, lastname].forEach((field) => {
    if (!undefinedBody && Number.isInteger(parseFloat(field))) {
      isDigit = true;
    }
  });
  if (isNull) {
    return res.status(400).send({ error: 'Please fill in all input fields' });
  }
  if (password) {
    if (req.body.password.length < 6) {
      errorMessage += 'password must be at least six characters long \n';
    }
  }
  if (email && !isValidEmail(email)) {
    errorMessage += 'Invalid email format \n';
  }
  if (isDigit) {
    errorMessage += 'Your name cannot be digits only \n';
  }
  if (password && confirmpassword && password !== confirmpassword) {
    errorMessage += 'password and confirmpassword are not equal \n';
  }
  if (errorMessage !== '') {
    return res.status(400).send({ error: errorMessage });
  }
  next();
};

const checkInvalidUserSignIn = (req, res, next) => {
  let errorMessage = '';
  if (req.body.email === undefined) {
    errorMessage += 'Please Input email \n';
  }
  if (req.body.password === undefined) {
    errorMessage += 'Please Input password \n';
  }
  if (req.body.email) {
    if (req.body.email.trim().length < 1) {
      errorMessage += 'Please fill in all input fields \n';
    }
  }
  if (req.body.email && !isValidEmail(req.body.email)) {
    errorMessage += 'Invalid email format \n';
  }
  if (errorMessage !== '') {
    return res.status(400).send({ error: errorMessage });
  }
  next();
};

export default {
  checkInvalidUserDetails,
  checkInvalidUserSignIn,
};
