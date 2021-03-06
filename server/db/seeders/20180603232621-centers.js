'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Centers', [
      {
        name: 'New Center',
        type: 'Multipurpose Hall',
        rentalCost: '230000',
        user: 'df7204e8-3402-437d-a6ff-88ce0bf4e3c8',
        id: 'bc4725b5-1840-4ab3-8fc9-08132572dedc',
        capacity: '30000000',
        address: '23, Andela street',
        mobileNumber: '08035271406',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/myapp-3df42.appspot.com/o/images%2Fwedding3.jpg?alt=media&token=068589c2-114f-42c6-97b0-bc386b8928dd',
        facilities: ['swimming-pool', 'lounge'],
        createdAt: new Date('2018-08-20').toISOString(),
        updatedAt: new Date('2018-08-20').toISOString(),
      }, {
        name: 'Old Center',
        type: 'Multipurpose Hall',
        rentalCost: '230000',
        mobileNumber: '08035271406',
        user: 'df7204e8-3402-437d-a6ff-88ce0bf4e3c8',
        id: '271b2312-5dca-40a9-b11d-cd6aae69f8e5',
        capacity: '30000000',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/myapp-3df42.appspot.com/o/images%2Fwedding3.jpg?alt=media&token=068589c2-114f-42c6-97b0-bc386b8928dd',
        createdAt: new Date('2018-08-20').toISOString(),
        facilities: ['swimming-pool', 'lounge'],
        address: '23, Andela street',
        updatedAt: new Date('2018-08-20').toISOString(),
      },
      {
        name: 'Miscell Center',
        type: 'Multipurpose Hall',
        rentalCost: '230000',
        mobileNumber: '08035271406',
        user: 'df7204e8-3402-437d-a6ff-88ce0bf4e3c8',
        id: 'dbaf958d-2d3e-4e2d-b28d-2cd898f535ed',
        capacity: '30000000',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/myapp-3df42.appspot.com/o/images%2Fweddin1.jpg?alt=media&token=f7adba4a-b386-46fd-b19e-30c092bf38d3',
        createdAt: new Date('2018-08-20').toISOString(),
        facilities: ['swimming-pool', 'lounge'],
        address: '23, Andela street',
        updatedAt: new Date('2018-08-20').toISOString(),
      },
      {
        name: 'Greatest Center',
        type: 'Multipurpose Hall',
        rentalCost: '230000',
        mobileNumber: '08035271406',
        user: 'df7204e8-3402-437d-a6ff-88ce0bf4e3c8',
        id: '9f22c6ac-e68c-47d0-89b3-14f049e4aee5',
        capacity: '30000000',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/myapp-3df42.appspot.com/o/images%2Fwedding3.jpg?alt=media&token=068589c2-114f-42c6-97b0-bc386b8928dd',
        createdAt: new Date('2018-08-20').toISOString(),
        facilities: ['swimming-pool', 'lounge'],
        address: '23, Andela street',
        updatedAt: new Date('2018-08-20').toISOString(),
      },
      {
        name: 'Nicest Center',
        type: 'Multipurpose Hall',
        rentalCost: '230000',
        mobileNumber: '08035271406',
        user: 'df7204e8-3402-437d-a6ff-88ce0bf4e3c8',
        id: 'ea278f44-a90f-44a4-921b-55709d73bfa3',
        capacity: '30000000',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/myapp-3df42.appspot.com/o/images%2Fwedding3.jpg?alt=media&token=068589c2-114f-42c6-97b0-bc386b8928dd',
        createdAt: new Date('2018-08-20').toISOString(),
        facilities: ['swimming-pool', 'lounge'],
        address: '23, Andela street',
        updatedAt: new Date('2018-08-20').toISOString(),
      },
      {
        name: 'Lovely Center',
        type: 'Multipurpose Hall',
        rentalCost: '230000',
        mobileNumber: '08035271406',
        user: 'df7204e8-3402-437d-a6ff-88ce0bf4e3c8',
        id: '7ddd6bae-bedc-4ce5-b53e-e71cef0c19b7',
        capacity: '30000000',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/myapp-3df42.appspot.com/o/images%2Fwedding3.jpg?alt=media&token=068589c2-114f-42c6-97b0-bc386b8928dd',
        createdAt: new Date('2018-08-20').toISOString(),
        facilities: ['swimming-pool', 'lounge'],
        address: '23, Andela street',
        updatedAt: new Date('2018-08-20').toISOString(),
      },
      {
        name: 'Rogaros',
        type: 'Multipurpose Hall',
        rentalCost: '230000',
        mobileNumber: '08035271406',
        user: 'df7204e8-3402-437d-a6ff-88ce0bf4e3c8',
        id: '99fbe51e-0ef4-4ff6-bc1b-e76ad0bd27ee',
        capacity: '30000000',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/myapp-3df42.appspot.com/o/images%2Fdemoimage.jpg?alt=media&token=c5a8489f-ed1f-41b2-8d2f-1a71cb442804',
        createdAt: new Date('2018-08-20').toISOString(),
        facilities: ['swimming-pool', 'lounge'],
        address: '23, Andela street',
        updatedAt: new Date('2018-08-20').toISOString(),
      },
      {
        name: 'Amitious',
        type: 'Multipurpose Hall',
        rentalCost: '230000',
        mobileNumber: '08035271406',
        user: 'df7204e8-3402-437d-a6ff-88ce0bf4e3c8',
        id: '37e6a662-1946-4712-a935-99b1e412a860',
        capacity: '30000000',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/myapp-3df42.appspot.com/o/images%2Fwedding3.jpg?alt=media&token=068589c2-114f-42c6-97b0-bc386b8928dd',
        createdAt: new Date('2018-08-20').toISOString(),
        facilities: ['swimming-pool', 'lounge'],
        address: '23, Andela street',
        updatedAt: new Date('2018-08-20').toISOString(),
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
  }
};
