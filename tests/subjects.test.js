const request = require('supertest');
const app = require('../server');

describe('Subjects GET endpoints', () => {
  test('GET /subjects should return all subjects', async () => {
    const res = await request(app).get('/subjects');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /subjects/:id invalid ID should fail', async () => {
    const res = await request(app).get('/subjects/invalidID');
    expect([400, 404, 500]).toContain(res.statusCode);
  });

  test('GET /subjects/:id non-existing ID should return 404 or 200', async () => {
    const fakeId = '507f1f77bcf86cd799439011';
    const res = await request(app).get(`/subjects/${fakeId}`);
    expect([404, 200]).toContain(res.statusCode);
  });

  test('GET /subjects should respond with JSON', async () => {
    const res = await request(app).get('/subjects');
    expect(res.headers['content-type']).toMatch(/json/);
  });
});
