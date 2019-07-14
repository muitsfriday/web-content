const mongo = require('mongodb')
const MongoClient = mongo.MongoClient
const ObjectID = mongo.ObjectID



const connectMongo = (url, dbName, callback) => {
	const client = new MongoClient(url)

	client.connect((err) => {
		if (err !== null) {
			console.error('connect to mongo failed.')
			setTimeout(() => connectMongo(url, dbName, callback), 5000)
			return
		}
	
		console.log("connected successfully to server")
		const db = client.db(dbName)
		callback(db)
	})
}


const toID = (id) => new ObjectID(id)


module.exports = {
	connect: connectMongo,
	toID: toID
}