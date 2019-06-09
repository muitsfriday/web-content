const MongoClient = require('mongodb').MongoClient


const connectMongo = (url, dbName, callback) => {
	const client = new MongoClient(url)

	client.connect((err) => {
		if (err !== null) {
			console.error('connect to mongo failed.')
			setTimeout(connectMongo, 5000)
			return
		}
	
		console.log("connected successfully to server")
		const db = client.db(dbName)
		callback(db)
	})
}

module.exports = {
	connect: connectMongo
}