const db = require('../../data/dbConfig')

function getBy(filter) {
    return db('users').where(filter)
}

function getById(id) {
    return db('users').where('id', id).first()
}

async function add(user) {
    const [id] = await db('users').insert(user)
    return getById(id)
}

module.exports = {getBy, add}