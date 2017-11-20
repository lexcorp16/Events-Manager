import request from 'supertest';
import chai from 'chai';
import app from '../app';

describe('test-cases for api routes', () => {
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
    it('responds with a 200 and welcome message in json', (done) => {
      const userCredentials = {
        firstname: 'ororo',
        lastname: 'ronaldo',
        email: 'lionelmessi@barca.com',
        password: 'thegreatest',
        confirmpassword: 'thegreatest',
      };
      request(app)
        .post('/api/v1/users')
        .send(userCredentials)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201, done)
        .expect((res) => {
          console.log(res.body);
        });
    });
  });
});
