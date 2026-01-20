const app = require('../server')
const request = require('supertest')

describe("POST /login"  , () => {

describe('Auth', () => {
    it('should respond with a 400 status code', async () => {
        const res = await request(app)
        .post('/api/admin/login')
        .send({
            email: '',
            password: ''
        })
        expect(res.status).toBe(400)
    })
})

describe('Auth', () => {
    it('should respond with a 400 status code', async () => {
        const res = await request(app)
        .post('/api/admin/login')
        .send({
            email: 'noureddinemaher13@gmail.com',
            password: ''
        })
        expect(res.status).toBe(400)
    })
})

describe('Auth', () => {
    it('should respond with a 400 status code', async () => {
        const res = await request(app)
        .post('/api/admin/login')
        .send({
            email: '',
            password: 'test'
        })
        expect(res.status).toBe(400)
    })
})

describe('Auth', () => {
    it('should respond with a 400 status code', async () => {
        const res = await request(app)
        .post('/api/admin/login')
        .send({
            email: 'test@gmail.com',
            password: 'test'
        })
        expect(res.status).toBe(400)
    })
})



})


describe("POST /register"  , () => {

    describe('Auth', () => {
        it('should respond with a 400 status code', async () => {
            const res = await request(app)
            .post('/api/admin/register')
            .send({
                First_Name: '',
                Second_Name: '',
                Email: '',
                Password: '',
                Phone_Number: ''
            })
            expect(res.status).toBe(400)
        })
    })

    describe('Auth', () => {
        it('should respond with a 400 status code', async () => {
            const res = await request(app)
            .post('/api/admin/register')
            .send({
                First_Name: 'Maher',
                Second_Name: 'noureddine',
                Email: 'test@gmail.com',
                Password: 'test',
                Phone_Number: ''
            })
            expect(res.status).toBe(400)
        })
    })

    describe('Auth', () => {
        it('should respond with a 400 status code', async () => {
            const res = await request(app)
            .post('/api/admin/register')
            .send({
                First_Name: 'maher',
                Second_Name: 'Noureddine',
                Email: 'test@gmail.com',
                Password: '',
                Phone_Number: '0623329476'
            })
            expect(res.status).toBe(400)
        })
    })

    describe('Auth', () => {
        it('should respond with a 400 status code', async () => {
            const res = await request(app)
            .post('/api/admin/register')
            .send({
                First_Name: 'maher',
                Second_Name: 'Noureddine',
                Email: '',
                Password: 'test',
                Phone_Number: '0623329476'
            })
            expect(res.status).toBe(400)
        })
    })

    describe('Auth', () => {
        it('should respond with a 400 status code', async () => {
            const res = await request(app)
            .post('/api/admin/register')
            .send({
                First_Name: '',
                Second_Name: 'Noureddine',
                Email: 'test@gmail.com',
                Password: 'test',
                Phone_Number: '0623329476'
            })
            expect(res.status).toBe(400)
        })
    })

})