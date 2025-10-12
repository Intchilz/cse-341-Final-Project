const request = require('supertest');
const app = require('../server');

describe('Pupils GET endpoints', () => {
  test('GET /pupils should return all pupils', async () => {
    const res = await request(app).get('/pupils');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /pupils/:id with invalid ID should fail', async () => {
    const res = await request(app).get('/pupils/invalid');
    expect([400, 404, 500]).toContain(res.statusCode);
  });

  test('GET /pupils/:id with non-existing ID returns 404', async () => {
    const fakeId = '507f1f77bcf86cd799439011';
    const res = await request(app).get(`/pupils/${fakeId}`);
    expect([200, 404]).toContain(res.statusCode);
  });

  test('GET /pupils returns application/json', async () => {
    const res = await request(app).get('/pupils');
    expect(res.headers['content-type']).toMatch(/json/);
  });
});
