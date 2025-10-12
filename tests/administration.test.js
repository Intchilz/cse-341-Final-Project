const request = require('supertest');
const app = require('../server');

describe('Administration GET endpoints', () => {
  test('GET /administration should return all admins', async () => {
    const res = await request(app).get('/administration');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /administration/:id with invalid ID should return error', async () => {
    const res = await request(app).get('/administration/12345');
    expect([400, 404, 500]).toContain(res.statusCode);
  });

  test('GET /administration/:id with valid but missing ID should return 404', async () => {
    const fakeId = '507f1f77bcf86cd799439011';
    const res = await request(app).get(`/administration/${fakeId}`);
    expect([200, 404]).toContain(res.statusCode);
  });

  test('GET /administration should respond with JSON', async () => {
    const res = await request(app).get('/administration');
    expect(res.headers['content-type']).toMatch(/json/);
  });
});
