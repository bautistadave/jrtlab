import request from "supertest";
import app from '../src/app.js'

describe('POST /address', () => {
    it('returns status code 200 if time is sended', async() => {
        const data = {
            lat : -17.3922658,
            lng : -66.1480371,
            address : "Plaza Sucre, Bolivar, Cochabamba, Bolivia"
        }

        await request(app)
            .post('/api/address')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            //expect(res.statusCode).toEqual(200);
    });    
});


