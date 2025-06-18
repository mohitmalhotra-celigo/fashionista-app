const request = require('supertest');
const app = require('../server/app');

describe('GET /version', () => {
  it('should return app version', async () => {
    const res = await request(app).get('/version');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('version');
    expect(typeof res.body.version).toBe('string');
  });
}); 