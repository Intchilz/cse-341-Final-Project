const request = require('supertest');
const app = require('../server');

describe('Teachers GET endpoints', () => {
  test('GET /teachers should return all teachers', async () => {
    const res = await request(app).get('/teachers');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /teachers/:id invalid ID should return error', async () => {
    const res = await request(app).get('/teachers/abc123');
    expect([400, 404, 500]).toContain(res.statusCode);
  });

  test('GET /teachers/:id non-existing ID should return 404 or 200', async () => {
    const fakeId = '507f1f77bcf86cd799439011';
    const res = await request(app).get(`/teachers/${fakeId}`);
    expect([404, 200]).toContain(res.statusCode);
  });

  test('GET /teachers should have Content-Type JSON', async () => {
    const res = await request(app).get('/teachers');
    expect(res.headers['content-type']).toMatch(/json/);
  });
});
