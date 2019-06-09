const express = require('express')
const bodyParser = require('body-parser')
const mongo = require('./db/mongo')

const url = process.env.MONGO_URL
const dbName = process.env.DB_NAME


let db = null
mongo.connect(url, dbName, (instance) => {
	db = instance
})


const response = (res, status, message) => {
	res.json({
		'status': status,
		'message': message
	})
}


// web server
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
	res.send('hello world 10')
})

app.post('/', (req, res) => {
	const username = req.body.username
	const password = req.body.password
	const accountCollection = db.collection('account')

	const filter = { 'username': username }
	const document = { username: username, password: password }

	accountCollection.findOne(filter, (err, d) => {
		if (d) {
			return response(res, false, 'user already exists')
		} 

		accountCollection.insertOne(document, (err, result) => {
			if (err !== null) {
				return response(res, false, 'cannot create user (db error)')
			}

			return response(res, result.result.n === 1, 'user ' + username + ' was created')
		})
	})
})

app.listen(process.env.PORT, () => {
	console.log('service user listening at port: ' + process.env.PORT)
})
