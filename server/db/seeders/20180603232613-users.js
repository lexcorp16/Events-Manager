const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Users', [
      {
        id: '94b76279-c907-4e07-88eb-eb1a514d00ad',
        firstname: 'John',
        lastname: 'Doe',
        email: 'efosa@gmail.com',
        password: bcrypt.hashSync('testers', 10),
        role: 'User',
        createdAt: new Date('2018-08-20').toISOString(),
        updatedAt: new Date('2018-08-20').toISOString(),
      }, {
        id: 'df7204e8-3402-437d-a6ff-88ce0bf4e3c8',
        firstname: 'Efosa',
        lastname: 'Okpugie',
        email: 'efosaokpugie@gmail.com',
        password: bcrypt.hashSync('swampious', 10),
        role: 'SuperAdmin',
        createdAt: new Date('2018-08-20').toISOString(),
        updatedAt: new Date('2018-08-20').toISOString(),
      },
      {
        id: '5da26755-5135-480d-b016-4cd429bb46ec',
        firstname: 'User',
        lastname: 'One',
        email: 'userone@gmail.com',
        password: bcrypt.hashSync('swampious', 10),
        role: 'User',
        createdAt: new Date('2018-08-20').toISOString(),
        updatedAt: new Date('2018-08-20').toISOString(),
      },
      {
        id: 'dafc8ad3-7a1f-4888-874d-ae48c8b27d1d',
        firstname: 'User',
        lastname: 'Two',
        email: 'usertwo@gmail.com',
        password: bcrypt.hashSync('swampious', 10),
        role: 'User',
        createdAt: new Date('2018-08-20').toISOString(),
        updatedAt: new Date('2018-08-20').toISOString(),
      },
      {
        id: '96a3eeef-af55-492e-9b4e-7948137e7440',
        firstname: 'User',
        lastname: 'Three',
        email: 'userthree@gmail.com',
        password: bcrypt.hashSync('swampious', 10),
        role: 'User',
        createdAt: new Date('2018-08-20').toISOString(),
        updatedAt: new Date('2018-08-20').toISOString(),
      },
      {
        id: '84ce2545-929e-4795-b33d-648d9fe3938d',
        firstname: 'User',
        lastname: 'four',
        email: 'userfour@gmail.com',
        password: bcrypt.hashSync('swampious', 10),
        role: 'User',
        createdAt: new Date('2018-08-20').toISOString(),
        updatedAt: new Date('2018-08-20').toISOString(),
      }
    ], {});
  },
  down: () => {
  }
};
