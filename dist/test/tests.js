'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _models = require('../db/models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Users = _models2.default.Users,
    Centers = _models2.default.Centers,
    Events = _models2.default.Events;
var expect = _chai2.default.expect;

before(function () {
  Users.destroy({
    cascade: true,
    truncate: true,
    restartIdentity: true
  });

  Events.destroy({
    cascade: true,
    truncate: true,
    restartIdentity: true
  });

  Centers.destroy({
    cascade: true,
    truncate: true,
    restartIdentity: true
  });
});

describe('test-cases for api routes', function () {
  var token = void 0;
  var secondToken = void 0;
  var centerId = void 0;
  var eventId = void 0;
  var secUserId = void 0;
  var thirdUserToken = void 0;
  var secondEventId = void 0;

  describe('GET /api', function () {
    it('responds with a 200 and welcome message in json', function (done) {
      (0, _supertest2.default)(_app2.default).get('/api').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200, { message: 'Welcome to the events-manager Api' }, done);
    });
  });

  describe('POST /api/v1/users', function () {
    var userCredentials = {
      firstname: 'ororo',
      lastname: 'ronaldo',
      email: 'efosaokpugie@gmail.com',
      password: 'thegreatest',
      confirmpassword: 'thegreatest'
    };
    it('creates a SuperAdmin and responds with 201', function (done) {
      (0, _supertest2.default)(_app2.default).post('/api/v1/users').send(userCredentials).set('Accept', 'application/json').expect('Content-Type', /json/).expect(201, done).expect(function (res) {
        token = res.body.token;
      });
    });
    it('creates a user and responds with 201', function (done) {
      var ordinaryUserCredential = {
        firstname: 'ororo',
        lastname: 'ronaldo',
        email: 'efosaokpugie@yahoo.com',
        password: 'thegreatest',
        confirmpassword: 'thegreatest'
      };
      (0, _supertest2.default)(_app2.default).post('/api/v1/users').send(ordinaryUserCredential).set('Accept', 'application/json').expect('Content-Type', /json/).expect(201, done).expect(function (res) {
        secUserId = _jsonwebtoken2.default.decode(res.body.token).userId;
        expect(res.body.message).to.equal('You have successfully signed up');
      });
    });
    it('creates a user and responds with 201', function (done) {
      var testUserCredential = {
        firstname: 'ororo',
        lastname: 'orororere',
        email: 'efosaokpugie23@outlook.com',
        password: 'thegreatest',
        confirmpassword: 'thegreatest'
      };
      (0, _supertest2.default)(_app2.default).post('/api/v1/users').send(testUserCredential).set('Accept', 'application/json').expect('Content-Type', /json/).expect(201, done).expect(function (res) {
        thirdUserToken = res.body.token;
        expect(res.body.message).to.equal('You have successfully signed up');
      });
    });
    describe('it validates user input when signing up', function () {
      it('sends a 400 response status if user inputs is missing a credential', function (done) {
        delete userCredentials.confirmpassword;
        (0, _supertest2.default)(_app2.default).post('/api/v1/users').send(userCredentials).set('Accept', 'application/json').expect(400, done).expect(function (res) {
          expect(_typeof(res.body.error)).to.equal('string');
        });
      });
      it('sends a 400 response status and errormessages if user input contain only digits', function (done) {
        userCredentials.confirmpassword = 'thegreatest';
        userCredentials.firstname = '2345';
        (0, _supertest2.default)(_app2.default).post('/api/v1/users').send(userCredentials).set('Accept', 'application/json').expect(400, done).expect(function (res) {
          expect(_typeof(res.body.error)).to.equal('string');
        });
      });
      it('sends a 400 response status and errormessages if a user input is null', function (done) {
        userCredentials.firstname = '';
        userCredentials.confirmpassword = 'thegreatest';
        (0, _supertest2.default)(_app2.default).post('/api/v1/users').send(userCredentials).set('Accept', 'application/json').expect(400, done).expect(function (res) {
          expect(_typeof(res.body.error)).to.equal('string');
        });
      });
      it('sends a 400 response status if a user input contains just whitespaces', function (done) {
        userCredentials.firstname = '       ';
        userCredentials.confirmpassword = 'thegreatest';
        (0, _supertest2.default)(_app2.default).post('/api/v1/users').send(userCredentials).set('Accept', 'application/json').expect(400, done).expect(function (res) {
          expect(_typeof(res.body.error)).to.equal('string');
        });
      });
      it('sends a 400 response status if a user password and confirmpassword is not equal', function (done) {
        userCredentials.confirmpassword = 'christiano';
        userCredentials.firstname = 'aguero';
        (0, _supertest2.default)(_app2.default).post('/api/v1/users').send(userCredentials).set('Accept', 'application/json').expect(400, done).expect(function (res) {
          expect(_typeof(res.body.error)).to.equal('string');
        });
      });
      it('sends a 400 response status if email is invalid', function (done) {
        userCredentials.email = 'lionelmessi';
        (0, _supertest2.default)(_app2.default).post('/api/v1/users').send(userCredentials).set('Accept', 'application/json').expect(400, done).expect(function (res) {
          expect(_typeof(res.body.error)).to.equal('string');
        });
      });
    });
  });

  describe('POST /api/v1/users/signin', function () {
    it('responds with a 200 and signs in a user', function (done) {
      var userCredentials = {
        email: 'efosaokpugie@gmail.com',
        password: 'thegreatest'
      };
      (0, _supertest2.default)(_app2.default).post('/api/v1/users/signin').send(userCredentials).set('Accept', 'application/json').expect('Content-Type', /json/).expect(200, done).expect(function (res) {
        expect(_typeof(res.body.token)).to.be.a('string');
      });
    });
    describe('It handles invalid user input', function () {
      var userCredentials = {
        email: 'lionelmessi@barca.com',
        password: 'thesamallest'
      };
      it('responds with a 400 if a user password is incorrect', function (done) {
        (0, _supertest2.default)(_app2.default).post('/api/v1/users/signin').send(userCredentials).set('Accept', 'application/json').expect('Content-Type', /json/).expect(400, done).expect(function (res) {
          expect(res.body.error).to.equal('Invalid email or password');
        });
      });
      it('responds with a 400 if a user email is incorrect', function (done) {
        userCredentials.email = 'efosaokpugie@gma.com';
        (0, _supertest2.default)(_app2.default).post('/api/v1/users/signin').send(userCredentials).set('Accept', 'application/json').expect('Content-Type', /json/).expect(400, done).expect(function (res) {
          expect(res.body.error).to.equal('Invalid email or password');
        });
      });
      it('responds with a 400 if a user input is null', function (done) {
        delete userCredentials.email;
        (0, _supertest2.default)(_app2.default).post('/api/v1/users/signin').send(userCredentials).set('Accept', 'application/json').expect('Content-Type', /json/).expect(400, done).expect(function (res) {
          expect(_typeof(res.body.error)).to.equal('string');
        });
      });
      it('responds with a 400 if a user input contains just whitespaces', function (done) {
        userCredentials.email = '     ';
        (0, _supertest2.default)(_app2.default).post('/api/v1/users/signin').send(userCredentials).set('Accept', 'application/json').expect('Content-Type', /json/).expect(400, done).expect(function (res) {
          expect(_typeof(res.body.error)).to.equal('string');
        });
      });
      it('responds with a 400 if a user email is invalid', function (done) {
        userCredentials.email = 'efosa@kkjl';
        (0, _supertest2.default)(_app2.default).post('/api/v1/users/signin').send(userCredentials).set('Accept', 'application/json').expect('Content-Type', /json/).expect(400, done).expect(function (res) {
          expect(res.body.error).to.equal('Invalid email format \n');
        });
      });
      it('allows capitalised emails', function (done) {
        userCredentials.email = 'efosaokpugie@GmaIl.com';
        userCredentials.password = 'thegreatest';
        (0, _supertest2.default)(_app2.default).post('/api/v1/users/signin').send(userCredentials).set('Accept', 'application/json').expect('Content-Type', /json/).expect(200, done).expect(function (res) {
          expect(res.body.message).to.equal('You have successfully logged in');
        });
      });
    });
  });
  describe('PUT /api/v1/users/userId', function () {
    it('makes a user become an admin', function (done) {
      (0, _supertest2.default)(_app2.default).put('/api/v1/users/' + secUserId + '/').set('auth', token).expect(202, done).expect(function (res) {
        expect(res.body.message).to.equal('Admin User successfully created');
      });
    });
  });

  describe('POST /api/v1/users/signin', function () {
    var fakeCredentials = {
      email: 'efosaokpugie@yahoo.com',
      password: 'thegreatest'
    };
    it('sign in admin', function (done) {
      (0, _supertest2.default)(_app2.default).post('/api/v1/users/signin').send(fakeCredentials).expect(200, done).expect(function (res) {
        secondToken = res.body.token;
      });
    });
  });

  describe('POST /api/v1/centers', function () {
    var centerDetails = {
      name: 'Rogaros',
      type: 'Wedding Reception',
      address: 'Number 22,yeru street',
      mobileNumber: '08156767778',
      capacity: '20000',
      rentalCost: '230000',
      facilities: ['swimming-pool', 'jacuzzi']
    };
    it('makes an admin add a center', function (done) {
      (0, _supertest2.default)(_app2.default).post('/api/v1/centers/').set('auth', secondToken).send(centerDetails).expect('Content-Type', /json/).expect(201, done).expect(function (res) {
        expect(res.body.message).to.equal('You have successfully added a center');
        expect(typeof centerId === 'undefined' ? 'undefined' : _typeof(centerId)).to.be.a('string');
        centerId = res.body.center.id;
      });
    });
    it('returns a 403 and error message if creator is an ordinary User', function (done) {
      centerDetails.address = 'Alhaji Bakare street,ojodu';
      (0, _supertest2.default)(_app2.default).post('/api/v1/centers/').set('auth', thirdUserToken).send(centerDetails).expect('Content-Type', /json/).expect(403, done).expect(function (res) {
        expect(res.body.error).to.equal('You are not authorized to perform this action');
      });
    });
    describe('it handles invalid input', function () {
      it('responds with a 400 if an input is null', function (done) {
        centerDetails.name = '';
        (0, _supertest2.default)(_app2.default).post('/api/v1/centers/').set('auth', secondToken).send(centerDetails).expect('Content-Type', /json/).expect(400, done).expect(function (res) {
          expect(res.body.error).to.equal('Please fill in all fields \n');
        });
      });
      it('responds with a 400 if capacity or mobileNumber input is alphanumeric', function (done) {
        centerDetails.name = 'Rogaros';
        centerDetails.capacity = 'ughfgh23';
        (0, _supertest2.default)(_app2.default).post('/api/v1/centers/').set('auth', secondToken).send(centerDetails).expect('Content-Type', /json/).expect(400, done).expect(function (res) {
          expect(_typeof(res.body.error)).to.equal('string');
        });
      });
      it('responds with a 400 if capacity or mobileNumber input alphabets only', function (done) {
        centerDetails.capacity = '2000';
        centerDetails.mobileNumber = 'jhfgffgfnhfh';
        (0, _supertest2.default)(_app2.default).post('/api/v1/centers/').set('auth', secondToken).send(centerDetails).expect('Content-Type', /json/).expect(400, done).expect(function (res) {
          expect(_typeof(res.body.error)).to.equal('string');
        });
      });
    });
  });

  describe('PUT /api/v1/centers/centerId', function () {
    it('modifies a center', function (done) {
      var modifyDetails = {
        mobileNumber: '08174393006'
      };
      (0, _supertest2.default)(_app2.default).put('/api/v1/centers/' + centerId).set('auth', secondToken).send(modifyDetails).expect('Content-Type', /json/).expect(200, done).expect(function (res) {
        expect(res.body.message).to.equal('You have successfully modified the center');
        expect(res.body.center.mobileNumber).to.equal('08174393006');
      });
    });
    it('returns an error message and 403 if modifier did not add center', function (done) {
      var modifyDetails = {
        mobileNumber: '08174393007'
      };
      (0, _supertest2.default)(_app2.default).put('/api/v1/centers/' + centerId).set('auth', token).send(modifyDetails).expect('Content-Type', /json/).expect(403, done).expect(function (res) {
        expect(res.body.error).to.equal('You cannot modify a center added by another user');
      });
    });
    it('returns an error message and 400 if center id is invalid', function (done) {
      var modifyDetails = {
        mobileNumber: '08174393008'
      };
      (0, _supertest2.default)(_app2.default).put('/api/v1/centers/1').set('auth', secondToken).send(modifyDetails).expect('Content-Type', /json/).expect(400, done).expect(function (res) {
        expect(res.body.error).to.equal('Invalid id supplied');
      });
    });
    it('returns an error message and 404 if center to be modified is not found', function (done) {
      var modifyDetails = {
        mobileNumber: '08174393009'
      };
      (0, _supertest2.default)(_app2.default).put('/api/v1/centers/c' + centerId.slice(1)).set('auth', secondToken).send(modifyDetails).expect('Content-Type', /json/).expect(404, done).expect(function (res) {
        expect(res.body.error).to.equal('center not found!');
      });
    });
    it('returns a 403 and error message if modifier is an ordinary User', function (done) {
      (0, _supertest2.default)(_app2.default).put('/api/v1/centers/' + centerId).set('auth', thirdUserToken).expect('Content-Type', /json/).expect(403, done).expect(function (res) {
        expect(res.body.error).to.equal('You are not authorized to perform this action');
      });
    });
    it('modifies the availability status of a center if no request body is sent', function (done) {
      (0, _supertest2.default)(_app2.default).put('/api/v1/centers/' + centerId).set('auth', secondToken).expect('Content-Type', /json/).expect(200, done).expect(function (res) {
        expect(res.body.message).to.equal('Successfully changed center status to false');
        expect(res.body.center.isAvailable).to.equal(false);
      });
    });
    it('alternates status of a center if no request body is sent', function (done) {
      (0, _supertest2.default)(_app2.default).put('/api/v1/centers/' + centerId).set('auth', secondToken).expect('Content-Type', /json/).expect(200, done).expect(function (res) {
        expect(res.body.message).to.equal('Successfully changed availability status to true');
        expect(res.body.center.isAvailable).to.equal(true);
      });
    });
  });
  describe('GET /api/v1/centers', function () {
    it('gets all centers', function (done) {
      (0, _supertest2.default)(_app2.default).get('/api/v1/centers/').set('Accept', 'application/json').expect(200, done).expect(function (res) {
        expect(res.body.centers.length).to.equal(1);
      });
    });
  });

  describe('POST /api/v1/events', function () {
    it('adds a new event', function (done) {
      var eventCredentials = {
        name: 'Graduation Party',
        type: 'Party',
        center: centerId,
        date: '2018-12-05'
      };
      (0, _supertest2.default)(_app2.default).post('/api/v1/events/').set('auth', secondToken).send(eventCredentials).expect(201, done).expect(function (res) {
        expect(res.body.message).to.equal('Event successfully added');
        eventId = res.body.newEvent.id;
      });
    });
    it('adds another new event', function (done) {
      var eventCredentials = {
        name: 'Birthday Party',
        type: 'Party',
        center: centerId,
        date: '2018-12-08'
      };
      (0, _supertest2.default)(_app2.default).post('/api/v1/events/').set('auth', secondToken).send(eventCredentials).expect(201, done).expect(function (res) {
        expect(res.body.message).to.equal('Event successfully added');
        secondEventId = res.body.newEvent.id;
      });
    });
    it('checks if an event is slated for the center being used before saving', function (done) {
      var eventCredentials = {
        name: 'Graduation Party',
        type: 'Party',
        center: centerId,
        date: '2018-12-05'
      };
      (0, _supertest2.default)(_app2.default).post('/api/v1/events/').set('auth', secondToken).send(eventCredentials).expect(409, done).expect(function (res) {
        expect(res.body.error).to.equal('Another event is slated for the chosen center,Please choose another date or center');
      });
    });
    it('returns a 406 if date chosen for event is past', function (done) {
      var eventCredentials = {
        name: 'Graduation Party',
        type: 'Party',
        center: centerId,
        date: '2017-12-05'
      };
      (0, _supertest2.default)(_app2.default).post('/api/v1/events/').set('auth', secondToken).send(eventCredentials).expect(406, done).expect(function (res) {
        expect(res.body.error).to.equal('The date chosen is past, please choose another date \n');
      });
    });
    it('returns a 400 if date chosen for event is invalid', function (done) {
      var eventCredentials = {
        name: 'Burial ceremonial',
        type: 'Party',
        center: centerId,
        date: 'saturdaay'
      };
      (0, _supertest2.default)(_app2.default).put('/api/v1/events/' + eventId).set('auth', secondToken).send(eventCredentials).expect(400, done).expect(function (res) {
        expect(res.body.error).to.equal('invalid date \n');
      });
    });
    it('returns a 400 for null input', function (done) {
      var eventCredentials = {
        name: '',
        type: 'Party',
        center: centerId,
        date: '2018-08-05'
      };
      (0, _supertest2.default)(_app2.default).post('/api/v1/events/').set('auth', secondToken).send(eventCredentials).expect(400, done).expect(function (res) {
        expect(res.body.error).to.equal('Please fill in all fields \n');
      });
    });
  });

  describe('GET /api/events/users', function () {
    it('returns the events of a User', function (done) {
      (0, _supertest2.default)(_app2.default).get('/api/v1/events/user').set('auth', secondToken).expect(200, done).expect(function (res) {
        expect(res.body.message).to.equal('Success');
      });
    });
  });

  describe('PUT /api/v1/events/<eventId>', function () {
    it('modifies an event', function (done) {
      var eventCredentials = {
        name: 'For loop',
        type: 'Seminar',
        center: centerId,
        date: '2018-11-02'
      };
      (0, _supertest2.default)(_app2.default).put('/api/v1/events/' + eventId).set('auth', secondToken).send(eventCredentials).expect(200, done).expect(function (res) {
        expect(res.body.message).to.equal('successfully modified');
      });
    });
    it('checks if a date is specified else rteturns and error', function (done) {
      var eventCredentials = {
        name: 'Andela Bootcamp',
        type: 'coding Bootcamp',
        center: centerId
      };
      (0, _supertest2.default)(_app2.default).put('/api/v1/events/' + eventId).set('auth', secondToken).send(eventCredentials).expect(400, done).expect(function (res) {
        expect(res.body.error).to.equal('Please specify date');
      });
    });
    it('returns a 406 if date chosen for event is past', function (done) {
      var eventCredentials = {
        name: 'Graduation Party',
        type: 'Party',
        center: centerId,
        date: '2017-12-05'
      };
      (0, _supertest2.default)(_app2.default).put('/api/v1/events/' + eventId).set('auth', secondToken).send(eventCredentials).expect(406, done).expect(function (res) {
        expect(res.body.error).to.equal('The date chosen is past, please choose another date \n');
      });
    });
    it('returns a 400 if date chosen for event is invalid', function (done) {
      var eventCredentials = {
        name: 'Burial ceremonial',
        type: 'Party',
        center: centerId,
        date: 'saturdaay'
      };
      (0, _supertest2.default)(_app2.default).put('/api/v1/events/' + eventId).set('auth', secondToken).send(eventCredentials).expect(400, done).expect(function (res) {
        expect(res.body.error).to.equal('invalid date \n');
      });
    });
    it('checks if an event is slated for the center before modifying', function (done) {
      var eventCredentials = {
        name: 'Andela Bootcamp',
        type: 'coding Bootcamp',
        center: centerId,
        date: '2018-11-02'
      };
      (0, _supertest2.default)(_app2.default).put('/api/v1/events/' + secondEventId).set('auth', secondToken).send(eventCredentials).expect(409, done).expect(function (res) {
        expect(res.body.error).to.equal('Another event is slated for the chosen center,Please choose another date or center');
      });
    });
    it('returns a 404 and error message if event not found', function (done) {
      var eventCredentials = {
        name: 'Andela Bootcamp',
        type: 'coding Dojo',
        date: '2018-11-04'
      };
      (0, _supertest2.default)(_app2.default).put('/api/v1/events/c' + eventId.slice(1)).set('auth', secondToken).send(eventCredentials).expect(404, done).expect(function (res) {
        expect(res.body.error).to.equal('No event found');
      });
    });
    it('returns a 400 and error message if id of event is invalid', function (done) {
      var eventCredentials = {
        name: 'Andela Bootcamp',
        type: 'coding regalia',
        date: '2018-11-07'
      };
      (0, _supertest2.default)(_app2.default).put('/api/v1/events/1').set('auth', secondToken).send(eventCredentials).expect(400, done).expect(function (res) {
        expect(res.body.error).to.equal('Invalid id supplied');
      });
    });
  });

  describe('GET /api/v1/centers/:centerId', function () {
    it('gets a center and events slated for that center', function (done) {
      (0, _supertest2.default)(_app2.default).get('/api/v1/centers/' + centerId).expect(200, done).expect(function (res) {
        expect(res.body.message).to.equal('Center successfully fetched');
      });
    });
    it('returns a 404 if center not found', function (done) {
      (0, _supertest2.default)(_app2.default).get('/api/v1/centers/c' + centerId.slice(1)).expect(404, done).expect(function (res) {
        expect(res.body.error).to.equal('No center found');
      });
    });
    it('returns a 400 and error message if invalid Id is supplied', function (done) {
      (0, _supertest2.default)(_app2.default).get('/api/v1/centers/1').expect(400, done).expect(function (res) {
        expect(res.body.error).to.equal('Invalid id supplied');
      });
    });
  });

  describe('DELETE /api/v1/events/<eventId>', function () {
    it('does not delete an event added by another user', function (done) {
      (0, _supertest2.default)(_app2.default).delete('/api/v1/events/' + eventId).set('auth', token).expect(403, done).expect(function (res) {
        expect(res.body.error).to.equal('You cannot delete an event added by another user');
      });
    });
    it('returns a 404 and error message if the event is not found', function (done) {
      (0, _supertest2.default)(_app2.default).delete('/api/v1/events/c' + eventId.slice(1)).set('auth', secondToken).expect(404, done).expect(function (res) {
        expect(res.body.error).to.equal('event not found');
      });
    });
    it('returns a 400 if there is an invalid credential due to Id', function (done) {
      (0, _supertest2.default)(_app2.default).delete('/api/v1/events/1').set('auth', secondToken).expect(400, done).expect(function (res) {
        expect(res.body.error).to.equal('Invalid id supplied');
      });
    });
    it('deletes an event', function (done) {
      (0, _supertest2.default)(_app2.default).delete('/api/v1/events/' + eventId).set('auth', secondToken).expect(200, done).expect(function (res) {
        expect(res.body.message).to.equal('Event successfully deleted');
      });
    });
  });

  describe('POST /api/v1/events/eventId', function () {
    it('adds a new event', function (done) {
      var eventCredentials = {
        name: 'Graduation Party',
        type: 'Party',
        center: centerId,
        date: '2018-12-12'
      };
      (0, _supertest2.default)(_app2.default).post('/api/v1/events/').set('auth', secondToken).send(eventCredentials).expect(201, done).expect(function (res) {
        eventId = res.body.newEvent.id;
        expect(res.body.message).to.equal('Event successfully added');
      });
    });
    it('returns a 403 and error message if unauthorized', function (done) {
      (0, _supertest2.default)(_app2.default).post('/api/v1/events/' + eventId).set('auth', thirdUserToken).expect(403, done).expect(function (res) {
        expect(res.body.error).to.equal('You are not authorized to perform this action');
      });
    });
    it('returns a 200 and sends email notification to user', function (done) {
      (0, _supertest2.default)(_app2.default).post('/api/v1/events/' + eventId).set('auth', secondToken).expect(200, done).expect(function (res) {
        expect(res.body.message).to.equal('Event canceled and notification sent');
      });
    });
  });

  describe('GET /api/v1/centers/search', function () {
    it('it performs a searchquery based on input', function (done) {
      (0, _supertest2.default)(_app2.default).get('/api/v1/centers?name=Rogaros').set('auth', secondToken).expect(200, done).expect(function (res) {
        expect(res.body.message).to.equal('Success');
      });
    });
    it('it returns a 200 and a message if no center is found', function (done) {
      (0, _supertest2.default)(_app2.default).get('/api/v1/centers?name=Rogarioiioio').set('auth', secondToken).expect(404, done).expect(function (res) {
        expect(res.body.error).to.equal('no centers found');
      });
    });
  });
});