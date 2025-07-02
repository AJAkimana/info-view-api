import * as chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Sample Route Test', () => {
  it('should return 404 for an unknown route', async () => {
    const res = await (chai as any).request(app).get('/unknown-route');
    expect(res).to.have.status(404);
  });
});
