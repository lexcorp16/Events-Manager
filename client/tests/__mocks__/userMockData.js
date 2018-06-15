const userMockData = {
  successfulLoginResponse: {
    error: 'an error occurred',
    message: 'You have successfully logged in',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxODVlOTQwZi05ZTQ5LTRjNGItYWE3Ny0zMTE2ZTk5ZDE1NjMiLCJyb2xlIjoiU3VwZXJBZG1pbiIsImlhdCI6MTUyNjkxODI2NCwiZXhwIjoxNTI3Mjc4MjY0fQ.shhYx9MMR7PNiMxPVwJ5r9a3M3DMOODxSNmgXbp3u9w',
  },
  unsuccessfulLoginResponse: {
    error: 'oops, an error occurred',
  },
  successAllUserResponse: {
    message: 'you have successfully fetched the users',
    users: [{
      firstname: 'myname',
      lastname: 'lastname',
      email: 'e@rmail.com',
      password: '&*((^^*HGIGGHJJUYCH'
    },
    {
      firstname: 'myname',
      lastname: 'lastname',
      email: 'e@rmail.com',
      password: '&*((^^*HGIGGHJJUYCH'
    },
    {
      firstname: 'myname',
      lastname: 'lastname',
      email: 'e@rmail.com',
      password: '&*((^^*HGIGGHJJUYCH'
    }]
  },
  genericErrorResponse: {
    error: 'No users found',
  },
  genericSuccessResponse: {
    message: 'Successfully performed action',
  }
};

export default userMockData;
