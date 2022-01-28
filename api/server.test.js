const server = require('./server')
const request = require('supertest')
const db = require('../data/dbConfig')

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

describe('Jokes are restricted', () => {
  it('GET /api/jokes/ returns error if not logged in', async () => {
    const res = await request(server).get('/api/jokes')
    expect(res.status).toBe(401)
    expect(res.body).toBe('token required')
  })
  it('GET /api/jokes/ is successful if logged in', async () => {
    
  })
})

// { 'username': 'jerry', 'password': '123456' }