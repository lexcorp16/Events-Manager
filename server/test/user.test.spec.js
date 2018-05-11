import chai from 'chai';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../app';
import models from '../db/models';

const { Users } = models;
const { expect } = chai;
before(() => {
  Users.destroy({
    cascade: true,
    truncate: true,
    restartIdentity: true,
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
});
