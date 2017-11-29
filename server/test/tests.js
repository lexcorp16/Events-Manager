import request from 'supertest';
import chai from 'chai';
import app from '../app';
import models from '../db/models';

const {
  Users,
  Centers,
  Events,
} = models;

const { expect } = chai;

Users.destroy({
  cascade: true,
  truncate: true,
  restartIdentity: true,
});

Centers.destroy({
  cascade: true,
  truncate: true,
  restartIdentity: true,
});

Events.destroy({
  cascade: true,
  truncate: true,
  restartIdentity: true,
});

describe('test-cases for api routes', () => {
  let token;
  let secondToken;
  let centerId;
  let eventId;
  let secUserId;
  describe('GET /', () => {
    it('responds with a 200 and welcome message in json', (done) => {
      request(app)
        .get('/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, { message: 'Welcome to the beginning of nothingness.' }, done);
    });
  });

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
          secUserId = res.body.user.id;
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
            expect(res.body.error).to.equal('Please input confirmpassword');
          });
      });
      it('sends a 400 response status if user input contain only digits', (done) => {
        userCredentials.confirmpassword = 'thegreatest';
        userCredentials.firstname = '2345';
        request(app)
          .post('/api/v1/users')
          .send(userCredentials)
          .set('Accept', 'application/json')
          .expect(400, done)
          .expect((res) => {
            expect(res.body.error).to.equal('Your names cannot be digits only');
          });
      });
      it('sends a 400 response status if a user input is null', (done) => {
        userCredentials.firstname = '';
        userCredentials.confirmpassword = 'thegreatest';
        request(app)
          .post('/api/v1/users')
          .send(userCredentials)
          .set('Accept', 'application/json')
          .expect(400, done)
          .expect((res) => {
            expect(res.body.error).to.equal('Please fill in all input field');
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
            expect(res.body.error).to.equal('Please fill in all input field');
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
            expect(res.body.error).to.equal('password and confirmpassword are not equal');
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
            expect(res.body.error).to.equal('Invalid email format');
          });
      });
    });
  });

  describe('POST /api/v1/users/signin', () => {
    it('responds with a 200 and signs in a user', (done) => {
      const userCredentials = {
        email: 'efosaokpugie@gmail.com',
        password: 'swampious',
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
            expect(res.body.error).to.equal('Please Input email');
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
            expect(res.body.error).to.equal('Please fill in all input fields');
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
            expect(res.body.error).to.equal('Invalid email format');
          });
      });
      it('allows capitalised emails', (done) => {
        userCredentials.email = 'efosaokpugie@GmaIl.com';
        userCredentials.password = 'swampious';
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
        mobileNumber: '081567677787',
        capacity: '20000',
      };
      it('makes an admin add a center', (done) => {
        request(app)
          .post('/api/v1/centers/')
          .set('auth', secondToken)
          .send(centerDetails)
          .expect('Content-Type', /json/)
          .expect(200, done)
          .expect((res) => {
            console.log(`HERE ${secondToken}`);
            centerId = res.body.center.id;
            expect(res.body.message).to.equal('You have successfully added a center');
            expect(typeof centerId).to.be.a('string');
            console.log(`HERE ${centerId}`);
            centerId = res.body.center.id;
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
          center: 'Rogaros',
          date: '2018-12-05',
        };
        request(app)
          .post('/api/v1/events/')
          .set('auth', secondToken)
          .send(eventCredentials)
          .expect(201, done)
          .expect((res) => {
            eventId = res.body.newEvent.id;
            console.log(`HERE ${eventCredentials.CenterId}`);
            expect(res.body.message).to.equal('Event successfully added');
          });
      });

      it('checks if an event is slated for the center being used before saving', (done) => {
        const eventCredentials = {
          name: 'Graduation Party',
          type: 'Party',
          center: 'Rogaros',
          date: '2018-12-05',
        };
        request(app)
          .post('/api/v1/events/')
          .set('auth', secondToken)
          .send(eventCredentials)
          .expect(400, done)
          .expect((res) => {
            console.log(`HERE ${eventCredentials.CenterId}`);
            expect(res.body.error).to.equal('Another event is slated for the chosen center,Please choose another date or center');
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
          center: 'Rogaros',
          date: '2018-11-02',
        };
        request(app)
          .put(`/api/v1/events/${eventId}`)
          .set('auth', secondToken)
          .send(eventCredentials)
          .expect(200, done)
          .expect((res) => {
            console.log(`HERE ${res.body.error}`);
            expect(res.body.message).to.equal('successfully modified');
          });
      });
      it('checks if an event is slated for the center before modifying', (done) => {
        const eventCredentials = {
          name: 'Andela Bootcamp',
          type: 'coding Bootcamp',
          center: 'Rogaros',
          date: '2018-11-02',
        };
        request(app)
          .put(`/api/v1/events/${eventId}`)
          .set('auth', secondToken)
          .send(eventCredentials)
          .expect(400, done)
          .expect((res) => {
            console.log(`HERE ${res.body.error}`);
            expect(res.body.error).to.equal('Another event is slated for the chosen center,Please choose another date or center');
          });
      });
    });

    describe('DELETES /api/v1/events/<eventId>', () => {
      it('deletes an event', (done) => {
        request(app)
          .delete(`/api/v1/events/${eventId}`)
          .set('auth', token)
          .expect(200, done)
          .expect((res) => {
            expect(res.body.message).to.equal('Event successfully deleted');
          });
      });
    });

    describe('POST /api/v1/events', () => {
      it('adds a new event', (done) => {
        const eventCredentials = {
          name: 'Graduation Party',
          type: 'Party',
          center: 'Rogaros',
          date: '2018-12-05',
        };
        request(app)
          .post('/api/v1/events/')
          .set('auth', secondToken)
          .send(eventCredentials)
          .expect(201, done)
          .expect((res) => {
            eventId = res.body.newEvent.id;
            console.log(`HERE ${eventCredentials.CenterId}`);
            expect(res.body.message).to.equal('Event successfully added');
          });
      });
    });
  });
});
