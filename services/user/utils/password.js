const crypto = require('crypto')


const hash = (password) => {
	// salt
	const salted = "_t$#=" + password + " dk$"
	return crypto.createHash('md5').update(salted).digest('base64')
}

const compare = (raw, hashed) => {
	return hash(raw) === hashed
}

module.exports = {
	hash,
	compare
}