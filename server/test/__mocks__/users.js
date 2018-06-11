const users = {
  validData: {
    firstname: 'John',
    lastname: 'Doe',
    email: 'efosaokpugie@yahoo.com',
    password: 'swampious',
    confirmpassword: 'swampious',
  },
  invalidDetails: {
    firstname: 'hwygejhy747474',
    lastname: '      ',
    email: 'e@com',
    password: '123',
    confirmpassword: 'juftdyie877'
  },
  missingDetails: {
    firstname: '123456',
  },
  invalidSigninData: {
    email: 'ef@y',
    password: '    '
  },
  missingSigninDetails: {},
  emptySigninData: {
    email: '     '
  },
  validSigninData: {
    email: 'efosaokpugie@yahoo.com',
    password: 'swampious',
  },
  wrongPassword: {
    email: 'efosaokpugie@yahoo.com',
    password: 'swampioud',
  },
  wrongEmail: {
    email: 'efosaokpugie@yahoo.co',
    password: 'swampious',
  }
};

export default users;
