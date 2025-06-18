import request from 'supertest';
import app from '../server/app';

describe('GET /version', () => {
  it('should return app version', async () => {
    const res = await request(app).get('/version');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('version');
    expect(typeof res.body.version).toBe('string');
  });
});

describe('GET /products', () => {
  it('should return products.html', async () => {
    const res = await request(app).get('/products');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Shop Our Collection');
  });
});

describe('GET /contact', () => {
  it('should return contact.html', async () => {
    const res = await request(app).get('/contact');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Contact Us');
  });
}); 