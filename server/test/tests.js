import request from 'supertest';
import chai from 'chai';
import jwt from 'jsonwebtoken';
import app from '../app';
import models from '../db/models';

const {
  Users,
  Centers,
  Events,
} = models;

const { expect } = chai;
before(() => {
  Users.destroy({
    cascade: true,
    truncate: true,
    restartIdentity: true,
  });

  Events.destroy({
    cascade: true,
    truncate: true,
    restartIdentity: true,
  });

  Centers.destroy({
    cascade: true,
    truncate: true,
    restartIdentity: true,
  });
});

describe('test-cases for api routes', () => {
  let token;
  let secondToken;
  let centerId;
  let eventId;
  let secUserId;
  let thirdUserToken;
  let secondEventId;

  describe('GET /api', () => {
    it('responds with a 200 and welcome message in json', (done) => {
      request(app)
        .get('/api')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, { message: 'Welcome to the events-manager Api' }, done);
    });
  });

  describe('POST /api/v1/users', () => {
    const userCredentials = {
      firstname: 'ororo',
      lastname: 'ronaldo',
      email: 'efosaokpugie@gmail.com',
      password: 'thegreatest',
      confirmpassword: 'thegreatest',
    };
    it('creates a SuperAdmin and responds with 201', (done) => {
      request(app)
        .post('/api/v1/users')
        .send(userCredentials)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201, done)
        .expect((res) => {
          token = res.body.token;
        });
    });
    it('creates a user and responds with 201', (done) => {
      const ordinaryUserCredential = {
        firstname: 'ororo',
        lastname: 'ronaldo',
        email: 'efosaokpugie@yahoo.com',
        password: 'thegreatest',
        confirmpassword: 'thegreatest',
      };
      request(app)
        .post('/api/v1/users')
        .send(ordinaryUserCredential)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201, done)
        .expect((res) => {
          secUserId = jwt.decode(res.body.token).userId;
          expect(res.body.message).to.equal('You have successfully signed up');
        });
    });
    it('creates a user and responds with 201', (done) => {
      const testUserCredential = {
        firstname: 'ororo',
        lastname: 'orororere',
        email: 'efosaokpugie23@outlook.com',
        password: 'thegreatest',
        confirmpassword: 'thegreatest',
      };
      request(app)
        .post('/api/v1/users')
        .send(testUserCredential)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201, done)
        .expect((res) => {
          thirdUserToken = res.body.token;
          expect(res.body.message).to.equal('You have successfully signed up');
        });
    });
    describe('it validates user input when signing up', () => {
      it('sends a 400 response status if user inputs is missing a credential', (done) => {
        delete userCredentials.confirmpassword;
        request(app)
          .post('/api/v1/users')
          .send(userCredentials)
          .set('Accept', 'application/json')
          .expect(400, done)
          .expect((res) => {
            expect(typeof res.body.error).to.equal('string');
          });
      });
      it('sends a 400 response status and errormessages if user input contain only digits', (done) => {
        userCredentials.confirmpassword = 'thegreatest';
        userCredentials.firstname = '2345';
        request(app)
          .post('/api/v1/users')
          .send(userCredentials)
          .set('Accept', 'application/json')
          .expect(400, done)
          .expect((res) => {
            expect(typeof res.body.error).to.equal('string');
          });
      });
      it('sends a 400 response status and errormessages if a user input is null', (done) => {
        userCredentials.firstname = '';
        userCredentials.confirmpassword = 'thegreatest';
        request(app)
          .post('/api/v1/users')
          .send(userCredentials)
          .set('Accept', 'application/json')
          .expect(400, done)
          .expect((res) => {
            expect(typeof res.body.error).to.equal('string');
          });
      });
      it('sends a 400 response status if a user input contains just whitespaces', (done) => {
        userCredentials.firstname = '       ';
        userCredentials.confirmpassword = 'thegreatest';
        request(app)
          .post('/api/v1/users')
          .send(userCredentials)
          .set('Accept', 'application/json')
          .expect(400, done)
          .expect((res) => {
            expect(typeof res.body.error).to.equal('string');
          });
      });
      it('sends a 400 response status if a user password and confirmpassword is not equal', (done) => {
        userCredentials.confirmpassword = 'christiano';
        userCredentials.firstname = 'aguero';
        request(app)
          .post('/api/v1/users')
          .send(userCredentials)
          .set('Accept', 'application/json')
          .expect(400, done)
          .expect((res) => {
            expect(typeof res.body.error).to.equal('string');
          });
      });
      it('sends a 400 response status if email is invalid', (done) => {
        userCredentials.email = 'lionelmessi';
        request(app)
          .post('/api/v1/users')
          .send(userCredentials)
          .set('Accept', 'application/json')
          .expect(400, done)
          .expect((res) => {
            expect(typeof res.body.error).to.equal('string');
          });
      });
    });
  });

  describe('POST /api/v1/users/signin', () => {
    it('responds with a 200 and signs in a user', (done) => {
      const userCredentials = {
        email: 'efosaokpugie@gmail.com',
        password: 'thegreatest',
      };
      request(app)
        .post('/api/v1/users/signin')
        .send(userCredentials)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done)
        .expect((res) => {
          expect(typeof res.body.token).to.be.a('string');
        });
    });
    describe('It handles invalid user input', () => {
      const userCredentials = {
        email: 'lionelmessi@barca.com',
        password: 'thesamallest',
      };
      it('responds with a 400 if a user password is incorrect', (done) => {
        request(app)
          .post('/api/v1/users/signin')
          .send(userCredentials)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400, done)
          .expect((res) => {
            expect(res.body.error).to.equal('Invalid email or password');
          });
      });
      it('responds with a 400 if a user email is incorrect', (done) => {
        userCredentials.email = 'efosaokpugie@gma.com';
        request(app)
          .post('/api/v1/users/signin')
          .send(userCredentials)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400, done)
          .expect((res) => {
            expect(res.body.error).to.equal('Invalid email or password');
          });
      });
      it('responds with a 400 if a user input is null', (done) => {
        delete userCredentials.email;
        request(app)
          .post('/api/v1/users/signin')
          .send(userCredentials)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400, done)
          .expect((res) => {
            expect(typeof res.body.error).to.equal('string');
          });
      });
      it('responds with a 400 if a user input contains just whitespaces', (done) => {
        userCredentials.email = '     ';
        request(app)
          .post('/api/v1/users/signin')
          .send(userCredentials)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400, done)
          .expect((res) => {
            expect(typeof res.body.error).to.equal('string');
          });
      });
      it('responds with a 400 if a user email is invalid', (done) => {
        userCredentials.email = 'efosa@kkjl';
        request(app)
          .post('/api/v1/users/signin')
          .send(userCredentials)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400, done)
          .expect((res) => {
            expect(res.body.error).to.equal('Invalid email format \n');
          });
      });
      it('allows capitalised emails', (done) => {
        userCredentials.email = 'efosaokpugie@GmaIl.com';
        userCredentials.password = 'thegreatest';
        request(app)
          .post('/api/v1/users/signin')
          .send(userCredentials)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200, done)
          .expect((res) => {
            expect(res.body.message).to.equal('You have successfully logged in');
          });
      });
    });
  });
  describe('PUT /api/v1/users/userId', () => {
    it('makes a user become an admin', (done) => {
      request(app)
        .put(`/api/v1/users/${secUserId}/`)
        .set('auth', token)
        .expect(202, done)
        .expect((res) => {
          expect(res.body.message).to.equal('Admin User successfully created');
        });
    });
  });

  describe('POST /api/v1/users/signin', () => {
    const fakeCredentials = {
      email: 'efosaokpugie@yahoo.com',
      password: 'thegreatest',
    };
    it('sign in admin', (done) => {
      request(app)
        .post('/api/v1/users/signin')
        .send(fakeCredentials)
        .expect(200, done)
        .expect((res) => {
          secondToken = res.body.token;
        });
    });
  });

  describe('POST /api/v1/centers', () => {
    const centerDetails = {
      name: 'Rogaros',
      type: 'Wedding Reception',
      address: 'Number 22,yeru street',
      mobileNumber: '08156767778',
      capacity: '20000',
      rentalCost: '230000',
    };
    it('makes an admin add a center', (done) => {
      request(app)
        .post('/api/v1/centers/')
        .set('auth', secondToken)
        .send(centerDetails)
        .expect('Content-Type', /json/)
        .expect(201, done)
        .expect((res) => {
          expect(res.body.message).to.equal('You have successfully added a center');
          expect(typeof centerId).to.be.a('string');
          centerId = res.body.center.id;
        });
    });
    it('returns a 403 and error message if creator is an ordinary User', (done) => {
      centerDetails.address = 'Alhaji Bakare street,ojodu';
      request(app)
        .post('/api/v1/centers/')
        .set('auth', thirdUserToken)
        .send(centerDetails)
        .expect('Content-Type', /json/)
        .expect(403, done)
        .expect((res) => {
          expect(res.body.error).to.equal('You are not authorized to perform this action');
        });
    });
    describe('it handles invalid input', () => {
      it('responds with a 400 if an input is null', (done) => {
        centerDetails.name = '';
        request(app)
          .post('/api/v1/centers/')
          .set('auth', secondToken)
          .send(centerDetails)
          .expect('Content-Type', /json/)
          .expect(400, done)
          .expect((res) => {
            expect(res.body.error).to.equal('please fill in all fields \n');
          });
      });
      it('responds with a 400 if capacity or mobileNumber input is alphanumeric', (done) => {
        centerDetails.name = 'Rogaros';
        centerDetails.capacity = 'ughfgh23';
        request(app)
          .post('/api/v1/centers/')
          .set('auth', secondToken)
          .send(centerDetails)
          .expect('Content-Type', /json/)
          .expect(400, done)
          .expect((res) => {
            expect(typeof res.body.error).to.equal('string');
          });
      });
      it('responds with a 400 if capacity or mobileNumber input alphabets only', (done) => {
        centerDetails.capacity = '2000';
        centerDetails.mobileNumber = 'jhfgffgfnhfh';
        request(app)
          .post('/api/v1/centers/')
          .set('auth', secondToken)
          .send(centerDetails)
          .expect('Content-Type', /json/)
          .expect(400, done)
          .expect((res) => {
            expect(typeof res.body.error).to.equal('string');
          });
      });
    });
  });

  describe('PUT /api/v1/centers/centerId', () => {
    it('modifies a center', (done) => {
      const modifyDetails = {
        mobileNumber: '08174393006'
      };
      request(app)
        .put(`/api/v1/centers/${centerId}`)
        .set('auth', secondToken)
        .send(modifyDetails)
        .expect('Content-Type', /json/)
        .expect(200, done)
        .expect((res) => {
          expect(res.body.message).to.equal('You have successfully modified the center');
          expect(res.body.center.mobileNumber).to.equal('08174393006');
        });
    });
    it('returns an error message and 403 if modifier did not add center', (done) => {
      const modifyDetails = {
        mobileNumber: '08174393007'
      };
      request(app)
        .put(`/api/v1/centers/${centerId}`)
        .set('auth', token)
        .send(modifyDetails)
        .expect('Content-Type', /json/)
        .expect(403, done)
        .expect((res) => {
          expect(res.body.error).to.equal('You cannot modify a center added by another user');
        });
    });
    it('returns an error message and 400 if center id is invalid', (done) => {
      const modifyDetails = {
        mobileNumber: '08174393008'
      };
      request(app)
        .put('/api/v1/centers/1')
        .set('auth', secondToken)
        .send(modifyDetails)
        .expect('Content-Type', /json/)
        .expect(400, done)
        .expect((res) => {
          expect(res.body.error).to.equal('Invalid id supplied');
        });
    });
    it('returns an error message and 404 if center to be modified is not found', (done) => {
      const modifyDetails = {
        mobileNumber: '08174393009'
      };
      request(app)
        .put(`/api/v1/centers/c${centerId.slice(1)}`)
        .set('auth', secondToken)
        .send(modifyDetails)
        .expect('Content-Type', /json/)
        .expect(404, done)
        .expect((res) => {
          expect(res.body.error).to.equal('center not found!');
        });
    });
    it('returns a 403 and error message if modifier is an ordinary User', (done) => {
      request(app)
        .put(`/api/v1/centers/${centerId}`)
        .set('auth', thirdUserToken)
        .expect('Content-Type', /json/)
        .expect(403, done)
        .expect((res) => {
          expect(res.body.error).to.equal('You are not authorized to perform this action');
        });
    });
    it('modifies the availability status of a center if no request body is sent', (done) => {
      request(app)
        .put(`/api/v1/centers/${centerId}`)
        .set('auth', secondToken)
        .expect('Content-Type', /json/)
        .expect(200, done)
        .expect((res) => {
          expect(res.body.message).to.equal('Successfully changed center status to false');
          expect(res.body.center.isAvailable).to.equal(false);
        });
    });
    it('alternates status of a center if no request body is sent', (done) => {
      request(app)
        .put(`/api/v1/centers/${centerId}`)
        .set('auth', secondToken)
        .expect('Content-Type', /json/)
        .expect(200, done)
        .expect((res) => {
          expect(res.body.message).to.equal('Successfully changed availability status to true');
          expect(res.body.center.isAvailable).to.equal(true);
        });
    });
  });
  describe('GET /api/v1/centers', () => {
    it('gets all centers', (done) => {
      request(app)
        .get('/api/v1/centers/')
        .set('Accept', 'application/json')
        .expect(200, done)
        .expect((res) => {
          expect(res.body.centers.length).to.equal(1);
        });
    });
  });

  describe('POST /api/v1/events', () => {
    it('adds a new event', (done) => {
      const eventCredentials = {
        name: 'Graduation Party',
        type: 'Party',
        center: centerId,
        date: '2018-12-05',
      };
      request(app)
        .post('/api/v1/events/')
        .set('auth', secondToken)
        .send(eventCredentials)
        .expect(201, done)
        .expect((res) => {
          expect(res.body.message).to.equal('Event successfully added');
          eventId = res.body.newEvent.id;
        });
    });
    it('adds another new event', (done) => {
      const eventCredentials = {
        name: 'Birthday Party',
        type: 'Party',
        center: centerId,
        date: '2018-12-08',
      };
      request(app)
        .post('/api/v1/events/')
        .set('auth', secondToken)
        .send(eventCredentials)
        .expect(201, done)
        .expect((res) => {
          expect(res.body.message).to.equal('Event successfully added');
          secondEventId = res.body.newEvent.id;
        });
    });
    it('checks if an event is slated for the center being used before saving', (done) => {
      const eventCredentials = {
        name: 'Graduation Party',
        type: 'Party',
        center: centerId,
        date: '2018-12-05',
      };
      request(app)
        .post('/api/v1/events/')
        .set('auth', secondToken)
        .send(eventCredentials)
        .expect(409, done)
        .expect((res) => {
          expect(res.body.error).to.equal('Another event is slated for the chosen center,Please choose another date or center');
        });
    });
    it('returns a 400 if date chosen for event is invalid', (done) => {
      const eventCredentials = {
        name: 'Graduation Party',
        type: 'Party',
        center: centerId,
        date: '2017-12-05',
      };
      request(app)
        .post('/api/v1/events/')
        .set('auth', secondToken)
        .send(eventCredentials)
        .expect(400, done)
        .expect((res) => {
          expect(res.body.error).to.equal('Invalid date \n');
        });
    });
    it('returns a 400 for null input', (done) => {
      const eventCredentials = {
        name: '',
        type: 'Party',
        center: centerId,
        date: '2018-08-05',
      };
      request(app)
        .post('/api/v1/events/')
        .set('auth', secondToken)
        .send(eventCredentials)
        .expect(400, done)
        .expect((res) => {
          expect(res.body.error).to.equal('Please fill in all fields \n');
        });
    });
    it('returns a 400 if date chosen for event is invalid', (done) => {
      const eventCredentials = {
        name: 'Burial ceremony',
        type: 'Party',
        center: centerId,
        date: '2017-08-05',
      };
      request(app)
        .post('/api/v1/events/')
        .set('auth', secondToken)
        .send(eventCredentials)
        .expect(400, done)
        .expect((res) => {
          expect(res.body.error).to.equal('Invalid date \n');
        });
    });
  });

  describe('GET /api/events/users', () => {
    it('returns the events of a User', (done) => {
      request(app)
        .get('/api/v1/events/user')
        .set('auth', secondToken)
        .expect(200, done)
        .expect((res) => {
          expect(res.body.message).to.equal('Success');
        });
    });
  });

  describe('PUT /api/v1/events/<eventId>', () => {
    it('modifies an event', (done) => {
      const eventCredentials = {
        name: 'For loop',
        type: 'Seminar',
        center: centerId,
        date: '2018-11-02',
      };
      request(app)
        .put(`/api/v1/events/${eventId}`)
        .set('auth', secondToken)
        .send(eventCredentials)
        .expect(200, done)
        .expect((res) => {
          expect(res.body.message).to.equal('successfully modified');
        });
    });
    it('checks if a date is specified else rteturns and error', (done) => {
      const eventCredentials = {
        name: 'Andela Bootcamp',
        type: 'coding Bootcamp',
        center: centerId,
      };
      request(app)
        .put(`/api/v1/events/${eventId}`)
        .set('auth', secondToken)
        .send(eventCredentials)
        .expect(400, done)
        .expect((res) => {
          expect(res.body.error).to.equal('Please specify date');
        });
    });
    it('checks if an event is slated for the center before modifying', (done) => {
      const eventCredentials = {
        name: 'Andela Bootcamp',
        type: 'coding Bootcamp',
        center: centerId,
        date: '2018-11-02',
      };
      request(app)
        .put(`/api/v1/events/${secondEventId}`)
        .set('auth', secondToken)
        .send(eventCredentials)
        .expect(409, done)
        .expect((res) => {
          expect(res.body.error).to.equal('Another event is slated for the chosen center,Please choose another date or center');
        });
    });
    it('returns a 404 and error message if event not found', (done) => {
      const eventCredentials = {
        name: 'Andela Bootcamp',
        type: 'coding Dojo',
        date: '2018-11-04'
      };
      request(app)
        .put(`/api/v1/events/c${eventId.slice(1)}`)
        .set('auth', secondToken)
        .send(eventCredentials)
        .expect(404, done)
        .expect((res) => {
          expect(res.body.error).to.equal('No event found');
        });
    });
    it('returns a 400 and error message if id of event is invalid', (done) => {
      const eventCredentials = {
        name: 'Andela Bootcamp',
        type: 'coding regalia',
        date: '2018-11-07'
      };
      request(app)
        .put('/api/v1/events/1')
        .set('auth', secondToken)
        .send(eventCredentials)
        .expect(400, done)
        .expect((res) => {
          expect(res.body.error).to.equal('Invalid id supplied');
        });
    });
  });

  describe('GET /api/v1/centers/:centerId', () => {
    it('gets a center and events slated for that center', (done) => {
      request(app)
        .get(`/api/v1/centers/${centerId}`)
        .expect(200, done)
        .expect((res) => {
          expect(res.body.message).to.equal('Success');
          expect(res.body.aCenter.venueOfEvent.length).to.equal(2);
        });
    });
    it('returns a 404 if center not found', (done) => {
      request(app)
        .get(`/api/v1/centers/c${centerId.slice(1)}`)
        .expect(404, done)
        .expect((res) => {
          expect(res.body.error).to.equal('No center found');
        });
    });
    it('returns a 400 and error message if invalid Id is supplied', (done) => {
      request(app)
        .get('/api/v1/centers/1')
        .expect(400, done)
        .expect((res) => {
          expect(res.body.error).to.equal('Invalid id supplied');
        });
    });
  });

  describe('DELETE /api/v1/events/<eventId>', () => {
    it('does not delete an event added by another user', (done) => {
      request(app)
        .delete(`/api/v1/events/${eventId}`)
        .set('auth', token)
        .expect(403, done)
        .expect((res) => {
          expect(res.body.error).to.equal('You cannot delete an event added by another user');
        });
    });
    it('returns a 404 and error message if the event is not found', (done) => {
      request(app)
        .delete(`/api/v1/events/c${eventId.slice(1)}`)
        .set('auth', secondToken)
        .expect(404, done)
        .expect((res) => {
          expect(res.body.error).to.equal('event not found');
        });
    });
    it('returns a 400 if there is an invalid credential due to Id', (done) => {
      request(app)
        .delete('/api/v1/events/1')
        .set('auth', secondToken)
        .expect(400, done)
        .expect((res) => {
          expect(res.body.error).to.equal('Invalid id supplied');
        });
    });
    it('deletes an event', (done) => {
      request(app)
        .delete(`/api/v1/events/${eventId}`)
        .set('auth', secondToken)
        .expect(200, done)
        .expect((res) => {
          expect(res.body.message).to.equal('Event successfully deleted');
        });
    });
  });

  describe('POST /api/v1/events/eventId', () => {
    it('adds a new event', (done) => {
      const eventCredentials = {
        name: 'Graduation Party',
        type: 'Party',
        center: centerId,
        date: '2018-12-12',
      };
      request(app)
        .post('/api/v1/events/')
        .set('auth', secondToken)
        .send(eventCredentials)
        .expect(201, done)
        .expect((res) => {
          eventId = res.body.newEvent.id;
          expect(res.body.message).to.equal('Event successfully added');
        });
    });
    it('returns a 403 and error message if unauthorized', (done) => {
      request(app)
        .post(`/api/v1/events/${eventId}`)
        .set('auth', thirdUserToken)
        .expect(403, done)
        .expect((res) => {
          expect(res.body.error).to.equal('You are not authorized to perform this action');
        });
    });
    it('returns a 200 and sends email notification to user', (done) => {
      request(app)
        .post(`/api/v1/events/${eventId}`)
        .set('auth', secondToken)
        .expect(200, done)
        .expect((res) => {
          expect(res.body.message).to.equal('Event canceled and notification sent');
        });
    });
  });

  describe('GET /api/v1/centers/search', () => {
    it('it performs a searchquery based on input', (done) => {
      request(app)
        .get('/api/v1/centers?name=Rogaros')
        .set('auth', secondToken)
        .expect(200, done)
        .expect((res) => {
          expect(res.body.message).to.equal('Success');
          expect(res.body.centers[0].name).to.equal('Rogaros');
        });
    });
    it('it returns a 200 and a message if no center is found', (done) => {
      request(app)
        .get('/api/v1/centers?name=Rogar')
        .set('auth', secondToken)
        .expect(404, done)
        .expect((res) => {
          expect(res.body.error).to.equal('There are no centers');
        });
    });
  });
});
