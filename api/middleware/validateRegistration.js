const User = require('../users/users-model')

async function validateRegistrationBody(req, res, next) {
    const { username, password } = req.body 
    try {
        if (username === undefined|| password === undefined) {
            return next({status: 400, message: 'Need a username and a password'})
        } else if (password.length < 3) {
            return next({status: 400, message: 'Password needs to be at least 4 characters long'})
        }
        const [usernameExists] = await User.getBy({ username })
        if (usernameExists) {
            next({status: 400, message: `Sorry, username ${username} is already taken!`})
        } else {
            req.user = {username, password}
            next()
        } 
    } catch (err) {
        next(err)
    }
    
}

module.exports = {validateRegistrationBody}