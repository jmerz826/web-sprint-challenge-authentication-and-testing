const User = require('../users/users-model')

async function validateRegistrationBody(req, res, next) {
    let { username, password } = req.body 
    username = username?.trim()
    password = password?.trim()
    try {
        if (!username || !password || username === undefined|| password === undefined) {
            return next({status: 400, message: 'username and password required'})
        } else if (password.length < 3) {
            return next({status: 400, message: 'Password needs to be at least 4 characters long'})
        }
        const [usernameExists] = await User.getBy({ username })
        if (usernameExists) {
            next({status: 400, message: `username taken`})
        } else {
            req.user = {username, password}
            next()
        } 
    } catch (err) {
        next(err)
    }
    
}

module.exports = {validateRegistrationBody}