const jwtVerify = require('express-jwt')
const jwtSecret = process.env.JWT_SECRET
const auth = jwtVerify({ secret: jwtSecret })

module.exports = {
	default: auth
}