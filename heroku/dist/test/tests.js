'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _models = require('../db/models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Users = _models2.default.Users,
    Centers = _models2.default.Centers,
    Events = _models2.default.Events;
var expect = _chai2.default.expect;


Users.destroy({
  cascade: true,
  truncate: true,
  restartIdentity: true
});

Centers.destroy({
  cascade: true,
  truncate: true,
  restartIdentity: true
});

Events.destroy({
  cascade: true,
  truncate: true,
  restartIdentity: true
});

describe('test-cases for api routes', function () {
  var token = void 0;
  var secondToken = void 0;
  var centerId = void 0;
  var eventId = void 0;
  var secUserId = void 0;
  describe('GET /', function () {
    it('responds with a 200 and welcome message in json', function (done) {
      (0, _supertest2.default)(_app2.default).get('/').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200, { message: 'Welcome to the beginning of nothingness.' }, done);
    });
  });

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
        secUserId = res.body.user.id;
        expect(res.body.message).to.equal('You have successfully signed up');
      });
    });
    describe('it validates user input when signing up', function () {
      it('sends a 400 response status if user inputs is missing a credential', function (done) {
        delete userCredentials.confirmpassword;
        (0, _supertest2.default)(_app2.default).post('/api/v1/users').send(userCredentials).set('Accept', 'application/json').expect(400, done).expect(function (res) {
          expect(res.body.error).to.equal('Please input confirmpassword');
        });
      });
      it('sends a 400 response status if user input contain only digits', function (done) {
        userCredentials.confirmpassword = 'thegreatest';
        userCredentials.firstname = '2345';
        (0, _supertest2.default)(_app2.default).post('/api/v1/users').send(userCredentials).set('Accept', 'application/json').expect(400, done).expect(function (res) {
          expect(res.body.error).to.equal('Your names cannot be digits only');
        });
      });
      it('sends a 400 response status if a user input is null', function (done) {
        userCredentials.firstname = '';
        userCredentials.confirmpassword = 'thegreatest';
        (0, _supertest2.default)(_app2.default).post('/api/v1/users').send(userCredentials).set('Accept', 'application/json').expect(400, done).expect(function (res) {
          expect(res.body.error).to.equal('Please fill in all input field');
        });
      });
      it('sends a 400 response status if a user input contains just whitespaces', function (done) {
        userCredentials.firstname = '       ';
        userCredentials.confirmpassword = 'thegreatest';
        (0, _supertest2.default)(_app2.default).post('/api/v1/users').send(userCredentials).set('Accept', 'application/json').expect(400, done).expect(function (res) {
          expect(res.body.error).to.equal('Please fill in all input field');
        });
      });
      it('sends a 400 response status if a user password and confirmpassword is not equal', function (done) {
        userCredentials.confirmpassword = 'christiano';
        userCredentials.firstname = 'aguero';
        (0, _supertest2.default)(_app2.default).post('/api/v1/users').send(userCredentials).set('Accept', 'application/json').expect(400, done).expect(function (res) {
          expect(res.body.error).to.equal('password and confirmpassword are not equal');
        });
      });
      it('sends a 400 response status if email is invalid', function (done) {
        userCredentials.email = 'lionelmessi';
        (0, _supertest2.default)(_app2.default).post('/api/v1/users').send(userCredentials).set('Accept', 'application/json').expect(400, done).expect(function (res) {
          expect(res.body.error).to.equal('Invalid email format');
        });
      });
    });
  });

  describe('POST /api/v1/users/signin', function () {
    it('responds with a 200 and signs in a user', function (done) {
      var userCredentials = {
        email: 'efosaokpugie@gmail.com',
        password: 'swampious'
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
          expect(res.body.error).to.equal('Please Input email');
        });
      });
      it('responds with a 400 if a user input contains just whitespaces', function (done) {
        userCredentials.email = '     ';
        (0, _supertest2.default)(_app2.default).post('/api/v1/users/signin').send(userCredentials).set('Accept', 'application/json').expect('Content-Type', /json/).expect(400, done).expect(function (res) {
          expect(res.body.error).to.equal('Please fill in all input fields');
        });
      });
      it('responds with a 400 if a user email is invalid', function (done) {
        userCredentials.email = 'efosa@kkjl';
        (0, _supertest2.default)(_app2.default).post('/api/v1/users/signin').send(userCredentials).set('Accept', 'application/json').expect('Content-Type', /json/).expect(400, done).expect(function (res) {
          expect(res.body.error).to.equal('Invalid email format');
        });
      });
      it('allows capitalised emails', function (done) {
        userCredentials.email = 'efosaokpugie@GmaIl.com';
        userCredentials.password = 'swampious';
        (0, _supertest2.default)(_app2.default).post('/api/v1/users/signin').send(userCredentials).set('Accept', 'application/json').expect('Content-Type', /json/).expect(200, done).expect(function (res) {
          expect(res.body.message).to.equal('You have successfully logged in');
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
        mobileNumber: '081567677787',
        capacity: '20000'
      };
      it('makes an admin add a center', function (done) {
        (0, _supertest2.default)(_app2.default).post('/api/v1/centers/').set('auth', secondToken).send(centerDetails).expect('Content-Type', /json/).expect(200, done).expect(function (res) {
          console.log('HERE ' + secondToken);
          centerId = res.body.center.id;
          expect(res.body.message).to.equal('You have successfully added a center');
          expect(typeof centerId === 'undefined' ? 'undefined' : _typeof(centerId)).to.be.a('string');
          console.log('HERE ' + centerId);
          centerId = res.body.center.id;
        });
      });

      describe('it handles invalid input', function () {
        it('responds with a 400 if an input is null', function (done) {
          centerDetails.name = '';
          (0, _supertest2.default)(_app2.default).post('/api/v1/centers/').set('auth', secondToken).send(centerDetails).expect('Content-Type', /json/).expect(400, done).expect(function (res) {
            expect(res.body.error).to.equal('please fill in all fields');
          });
        });
        it('responds with a 400 if capacity or mobileNumber input is alphanumeric', function (done) {
          centerDetails.name = 'Rogaros';
          centerDetails.capacity = 'ughfgh23';
          (0, _supertest2.default)(_app2.default).post('/api/v1/centers/').set('auth', secondToken).send(centerDetails).expect('Content-Type', /json/).expect(400, done).expect(function (res) {
            expect(res.body.error).to.equal('capacity and mobileNumber fields can only be digits');
          });
        });
        it('responds with a 400 if capacity or mobileNumber input alphabetsonly', function (done) {
          centerDetails.capacity = '2000';
          centerDetails.mobileNumber = 'jhfgffgfnhfh';
          (0, _supertest2.default)(_app2.default).post('/api/v1/centers/').set('auth', secondToken).send(centerDetails).expect('Content-Type', /json/).expect(400, done).expect(function (res) {
            expect(res.body.error).to.equal('capacity and mobileNumber fields can only be digits');
          });
        });
      });
    });

    describe('PUT /api/v1/cenetrs/centerId', function () {
      it('modifies a center', function (done) {
        var modifyDetails = {
          mobileNumber: '081743930'
        };
        (0, _supertest2.default)(_app2.default).put('/api/v1/centers/' + centerId).set('auth', secondToken).send(modifyDetails).expect('Content-Type', /json/).expect(200, done).expect(function (res) {
          expect(res.body.message).to.equal('You have successfully modified the center');
          expect(res.body.center.mobileNumber).to.equal('081743930');
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
          center: 'Rogaros',
          date: '2018-12-05'
        };
        (0, _supertest2.default)(_app2.default).post('/api/v1/events/').set('auth', secondToken).send(eventCredentials).expect(201, done).expect(function (res) {
          eventId = res.body.newEvent.id;
          console.log('HERE ' + eventCredentials.CenterId);
          expect(res.body.message).to.equal('Event successfully added');
        });
      });

      it('checks if an event is slated for the center being used before saving', function (done) {
        var eventCredentials = {
          name: 'Graduation Party',
          type: 'Party',
          center: 'Rogaros',
          date: '2018-12-05'
        };
        (0, _supertest2.default)(_app2.default).post('/api/v1/events/').set('auth', secondToken).send(eventCredentials).expect(400, done).expect(function (res) {
          console.log('HERE ' + eventCredentials.CenterId);
          expect(res.body.error).to.equal('Another event is slated for the chosen center,Please choose another date or center');
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
          center: 'Rogaros',
          date: '2018-11-02'
        };
        (0, _supertest2.default)(_app2.default).put('/api/v1/events/' + eventId).set('auth', secondToken).send(eventCredentials).expect(200, done).expect(function (res) {
          console.log('HERE ' + res.body.error);
          expect(res.body.message).to.equal('successfully modified');
        });
      });
      it('checks if an event is slated for the center before modifying', function (done) {
        var eventCredentials = {
          name: 'Andela Bootcamp',
          type: 'coding Bootcamp',
          center: 'Rogaros',
          date: '2018-11-02'
        };
        (0, _supertest2.default)(_app2.default).put('/api/v1/events/' + eventId).set('auth', secondToken).send(eventCredentials).expect(400, done).expect(function (res) {
          console.log('HERE ' + res.body.error);
          expect(res.body.error).to.equal('Another event is slated for the chosen center,Please choose another date or center');
        });
      });
    });

    describe('DELETES /api/v1/events/<eventId>', function () {
      it('deletes an event', function (done) {
        (0, _supertest2.default)(_app2.default).delete('/api/v1/events/' + eventId).set('auth', secondToken).expect(200, done).expect(function (res) {
          expect(res.body.message).to.equal('Event successfully deleted');
        });
      });
    });

    describe('POST /api/v1/events', function () {
      it('adds a new event', function (done) {
        var eventCredentials = {
          name: 'Graduation Party',
          type: 'Party',
          center: 'Rogaros',
          date: '2018-12-05'
        };
        (0, _supertest2.default)(_app2.default).post('/api/v1/events/').set('auth', secondToken).send(eventCredentials).expect(201, done).expect(function (res) {
          eventId = res.body.newEvent.id;
          console.log('HERE ' + eventCredentials.CenterId);
          expect(res.body.message).to.equal('Event successfully added');
        });
      });
    });
  });
});