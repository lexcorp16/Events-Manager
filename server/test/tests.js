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
      email: 'lionelmessi@barca.com',
      password: 'thegreatest',
      confirmpassword: 'thegreatest',
    };
    it('creates a new User and responds with 201', (done) => {
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
        email: 'lionelmessi@barca.com',
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
  });

  describe('PUT /api/v1/users/admin', () => {
    it('makes a user become an admin', (done) => {
      request(app)
        .put('/api/v1/users/admin/')
        .set('auth', token)
        .expect(202, done)
        .expect((res) => {
          expect(res.body.message).to.equal('You are now an admin,Please log in again to begin using all admin features');
        });
    });
  });

  describe('POST /api/v1/users/signin', () => {
    const fakeCredentials = {
      email: 'lionelmessi@barca.com',
      password: 'thegreatest',
    };
    it('sign in admin', (done) => {
      request(app)
        .post('/api/v1/users/signin')
        .send(fakeCredentials)
        .expect(200, done)
        .expect((res) => {
          secondToken = res.body.token;
          console.log(token);
        });
    });
  });

  describe('POST /api/v1/centers', () => {
    const centerDetails = {
      name: 'Rogaros',
      type: 'Wedding Reception',
      location: 'Lagos',
      address: 'Number 22,yeru street',
      mobileNumber: '081567677787',
    };
    it('makes an admin add a center', (done) => {
      request(app)
        .post('/api/v1/centers/')
        .set('auth', secondToken)
        .send(centerDetails)
        .expect('Content-Type', /json/)
        .expect(200, done)
        .expect((res) => {
          expect(res.body.message).to.equal('You have successfully added a center');
        });
    });
  });
});
