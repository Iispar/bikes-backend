const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

describe('bike api tests', () => {
  test('bikes are returned as json', async () => {
    await api
      .get('/api/bikers/all')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('bikes have needed fields', async () => {
    const res = await api
      .get('/api/bikers/all');
    expect(res.body[0].Departure_station_id).toBeDefined();
    expect(res.body[0].Departure_station_name).toBeDefined();
    expect(res.body[0].Return_station_id).toBeDefined();
    expect(res.body[0].Return_station_name).toBeDefined();
    expect(res.body[0].Covered_distance).toBeDefined();
    expect(res.body[0].Duration).toBeDefined();
  });

  test('filtering works', async () => {
    const res = await api
      .get('/api/bikers?Duration>1000&Covered_distance>2000&limit=10');
    const res2 = await api
      .get('/api/bikers?Return_station_id=100&limit=5');
    expect(res.body[0].Duration > 1000).toBeTruthy();
    expect(res.body[0].Covered_distance > 2000).toBeTruthy();
    expect(res.body.length).toBe(10);

    expect(res2.body[0].Return_station_id).toBe('100');
    expect(res2.body.length).toBe(5);
  });

  test('sorting works', async () => {
    const res = await api
      .get('/api/bikers?sort=-Duration&limit=10');

    expect(res.body[1].Duration <= res.body[0].Duration).toBeTruthy();
    expect(res.body[4].Duration <= res.body[3].Duration).toBeTruthy();
  });

  test('counting works', async () => {
    const res = await api
      .get('/api/bikers/count/100/all');
    expect(res.body[0].count).toBe(2453);

    const res2 = await api
      .get('/api/bikers/count/100/5');
    expect(res2.body[0].count).toBe(672);
  });

  test('Average distance works', async () => {
    const resDistanceReturn5 = await api
      .get('/api/bikers/average/return/100/5');
    expect(resDistanceReturn5.body[0].average).toBe(2875.9930505952384);
    const resDistanceReturnAll = await api
      .get('/api/bikers/average/return/100/all');
    expect(resDistanceReturnAll.body[0].average).toBe(3062.8166720192694);

    const resDistanceDeparture6 = await api
      .get('/api/bikers/average/departure/150/6');
    expect(resDistanceDeparture6.body[0].average).toBe(2612.1708780795957);
    const resDistanceDepartureAll = await api
      .get('/api/bikers/average/departure/150/all');
    expect(resDistanceDepartureAll.body[0].average).toBe(2598.414327868852);
  });

  test('top5 works', async () => {
    const resReturn = await api
      .get('/api/bikers/top/return/100/all');
    expect(resReturn.body[0]._id).toBe('94');
    expect(resReturn.body[1]._id).toBe('101');
    expect(resReturn.body[2]._id).toBe('100');
    expect(resReturn.body[3]._id).toBe('208');
    expect(resReturn.body[4]._id).toBe('93');

    const resDeparture = await api
      .get('/api/bikers/top/departure/100/all');
    expect(resDeparture.body[0]._id).toBe('94');
    expect(resDeparture.body[1]._id).toBe('101');
    expect(resDeparture.body[2]._id).toBe('100');
    expect(resDeparture.body[3]._id).toBe('208');
    expect(resDeparture.body[4]._id).toBe('209');
  });
});

afterAll(() => {
  mongoose.connection.close();
});
