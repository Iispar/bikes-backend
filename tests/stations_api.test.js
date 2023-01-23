const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

describe('stations api tests', () => {
  test('stations are returned as json', async () => {
    await api
      .get('/api/stations/all')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('stations have needed fields', async () => {
    const res = await api
      .get('/api/stations/all');
    expect(res.body[0].ID).toBeDefined();
    expect(res.body[0].Name_fi).toBeDefined();
    expect(res.body[0].Name_swe).toBeDefined();
    expect(res.body[0].Name).toBeDefined();
    expect(res.body[0].Adress_fi).toBeDefined();
    expect(res.body[0].Adress).toBeDefined();
    expect(res.body[0].City_fi).toBeDefined();
    expect(res.body[0].City_swe).toBeDefined();
    expect(res.body[0].Operator).toBeDefined();
    expect(res.body[0].Capasity).toBeDefined();
    expect(res.body[0].x).toBeDefined();
    expect(res.body[0].y).toBeDefined();
  });

  test('filtering works', async () => {
    const res = await api
      .get('/api/stations?Name_fi=Hanasaari&limit=10');
    const res2 = await api
      .get('/api/stations?City_fi=Espoo&limit=5');
    expect(res.body[0].Name_fi).toBe('Hanasaari');
    expect(res2.body[0].City_fi).toBe('Espoo');
    expect(res2.body.length).toBe(5);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
