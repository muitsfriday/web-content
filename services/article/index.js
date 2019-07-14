const express = require('express')
const mongo = require('./db/mongo')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const jwtVerify = require('express-jwt')

const url = process.env.MONGO_URL
const dbName = process.env.DB_NAME
const jwtSecret = process.env.JWT_SECRET

const auth = jwtVerify({ secret: jwtSecret })

let db = null
mongo.connect(url, dbName, (instance) => {
	db = instance
})

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/', (req, res) => {
	console.log('req.xxx: ', req.xxx)
	const collecton = db.collection('article')
	const getArticlesTask = collecton.find({
		deleteAt: { $exists: false }
	}, {
		projection: { content: 0 }
	}).toArray()

	getArticlesTask
		.then((result) => {
			res.send({ list: result })
		})
		.catch((err) => {
			res.send({ list: [], err: err })
		})
})


app.get('/:id', (req, res) => {
	const id = mongo.toID(req.params.id)
	const collecton = db.collection('article')

	collecton.findOne({ 
		_id: id, 
		deleteAt: { $exists: false } 
	})
	.then(result => {
		res.status(result ? 200 : 404).send({ data: result })
	})
	.catch(err => {
		res.status(500).send({ data: null, err: err })
	})

})


app.post('/', auth, (req, res) => {
	const title = req.body.title
	const content = req.body.content
	const username = req.user.username

	const collecton = db.collection('article')
	collecton.insertOne({
		title,
		content,
		username,
		createAt: new Date(),
		updateAt: new Date(),
	}).then(result => {
		res.send({ status: true })
	}).catch(err => {
		res.send({ status: false, err })
	})
})


app.post('/:id', auth, (req, res) => {
	const id = mongo.toID(req.params.id)
	const title = req.body.title || false
	const content = req.body.content || false
	const username = req.user.username

	const updates = {}
	if (title !== false) {
		updates.title = title
	}
	if (content !== false) {
		updates.content = content
	}

	const collecton = db.collection('article')
	collecton.updateOne({ _id: id, username }, { $set: updates })
	.then(result => {
		res.send({ status: result.result.ok > 0 })
	})
	.catch(err => {
		res.send({ status: false, err })
	})
})


app.delete('/:id', auth, (req, res) => {
	const id = mongo.toID(req.params.id)
	const username = req.user.username
	const collecton = db.collection('article')

	console.log('(1)', id)

	collecton.findOne({ _id: id })
	.then(result => {
		console.log('(2)', result)
		if (!result) {
			return res.send({ status: false, message: 'article not found' })
		}

		if (result.username !== username) {
			return res.status(401).send({ status: false, message: 'not authorized' })
		}

		return collecton.updateOne(
			{ _id: id }, 
			{ $set: { deleteAt: new Date() } 
		})
	})
	.then(result => {
		res.send({ status: result.result.ok > 0 })
	})
	.catch(err => {
		res.status(500).send({ status: false, err })
	})

})



app.listen(process.env.PORT, () => {
	console.log('service user listening at port: ' + process.env.PORT)
})