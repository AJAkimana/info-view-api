import * as chai from 'chai';
import request from 'supertest';
import app from '../src/app';

const expect = chai.expect;

describe('Sample Route Test', () => {
  it('should return 404 for an unknown route', async () => {
    const res = await request(app).get('/unknown-route');
    expect(res.status).to.equal(404);
  });
});
