const db = require('../../data/dbConfig')

function getBy(filter) {
    return db('users').where(filter)
}


module.exports = {getBy}