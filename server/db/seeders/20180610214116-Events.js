'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Events', [{
      id: '976ea87b-5644-4a61-ba05-f910ddea3138',
      name: 'My Birthday',
      type: 'Birthday',
      startDate: new Date('2018-08-07').toISOString(),
      endDate: new Date('2018-08-09').toISOString(),
      user: 'df7204e8-3402-437d-a6ff-88ce0bf4e3c8',
      center: 'bc4725b5-1840-4ab3-8fc9-08132572dedc',
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    }], {});
    // skdksld
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('Events', null, {});
  }
};
