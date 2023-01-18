const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('bike api tests', () => {
    test('bikes are returned as json', async () => {
    await api
        .get('/api/bikers/all')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('bikes have needed fields', async () => {
        const res = await api
            .get('/api/bikers/all')
        expect(res.body[0].Departure_station_id).toBeDefined()
        expect(res.body[0].Departure_station_name).toBeDefined()
        expect(res.body[0].Return_station_id).toBeDefined()
        expect(res.body[0].Return_station_name).toBeDefined()
        expect(res.body[0].Covered_distance).toBeDefined()
        expect(res.body[0].Duration).toBeDefined()
        })

    test('filtering works', async () => {
        const res = await api
            .get('/api/bikers?Duration>1000&Covered_distance>2000&limit=10')
        const res2 = await api
            .get('/api/bikers?Return_station_id=100&limit=5')
        expect(res.body[0].Duration > 1000).toBeTruthy()
        expect(res.body[0].Covered_distance > 2000).toBeTruthy()
        expect(res.body.length).toBe(10)

        expect(res2.body[0].Return_station_id).toBe("100")
        expect(res2.body.length).toBe(5)
    })

    test('sorting works', async () => {
        const res = await api
            .get('/api/bikers?sort=-Duration&limit=10')

        expect(res.body[1].Duration <= res.body[0].Duration).toBeTruthy()
        expect(res.body[4].Duration <= res.body[3].Duration).toBeTruthy()
    })

    test('counting works', async () => {
        const res = await api
            .get('/api/bikers/count?Return_station_id=100')
        expect(res.body).toBe(1348)
    })
})

afterAll(() => {
    mongoose.connection.close()
    })