const User = require('../users/users-model')

async function validateLoginCreds(req, res, next) {
    let { username, password } = req.body
    username = username?.trim()
    password = password?.trim()

    if (!username || !password || username === undefined || password === undefined) {
        return next({status: 400, message: 'username and password required'})
    }
    const [usernameExists] = await User.getBy({ username })
    if (!usernameExists) {
        next({status: 400, message: 'invalid credentials'})
    } else {
        console.log(usernameExists)
        next()
    }
}

module.exports = {validateLoginCreds}