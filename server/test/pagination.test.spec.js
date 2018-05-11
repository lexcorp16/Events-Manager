import request from 'supertest';
import app from '../app';

const { expect } = chai;

describe('Pagination test specs', () => {
  it ('returns the number of pages when getting centers', (done) => {
    request(app)
      .get('/api/v1/centers')
      .set('/application/json/')
      .expect(200, done)
      .expect((res) => {
        expect(res.body.page).to.be.a('integer');
      });
  });
});