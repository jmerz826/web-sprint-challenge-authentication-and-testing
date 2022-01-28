const server = require('./server')
const request = require('supertest')
const db = require('../data/dbConfig')
const tokenBuilder = require('./auth/auth-token-builder')
const User = require('../api/users/users-model')

// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db.seed.run()
})
afterAll(async () => {
  await db.destroy()
})

describe('ENDPOINT /api/jokes', () => {
  it('GET returns error if not logged in', async () => {
    const res = await request(server).get('/api/jokes')
    expect(res.status).toBe(401)
    expect(res.body).toBe('token required')
  })
  it('GET is successful if logged in', async () => {
    const token = await tokenBuilder({ user: 'test' })
    const res = await request(server).get('/api/jokes').set("Authorization", token)
    expect(res.body).toHaveLength(3)
  })
})

describe('ENDPOINT /api/auth/register', () => {
  it('can successfully add a new user', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({ username: 'xyz', password: '123456' })
    
    // return newly added user
    expect(res.body.username).toBe('xyz')
    
    // new user actually added to db
    const users = await db('users')
    expect(users.length).toBe(5)
  })
})

