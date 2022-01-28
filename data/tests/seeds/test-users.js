
exports.seed = function(knex) {
  return knex('users').truncate()
    .then(function () {
      return knex('users').insert([
        {username: 'jerry', password: '123456'},
        {username: 'george', password: '123456'},
        { username: 'elaine', password: '123456' },
        { username: 'kramer', password: '123456' },
      ])
    })
}
