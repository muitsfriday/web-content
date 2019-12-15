const shortid = require('shortid')
const router = require('express').Router()

const auth = require('../middleware/auth').default

function getRouter (db) {

	/**
	 * get list of article
	 */
	router.get('/admin/articles', auth, (req, res) => {
		const username = req.user.username
		const coll = db.collection('article')
		const filter = { 'user.username' : username, deleteAt: { $exists: false } }
		const opts = { projection: { content : 0 } }
		
		coll.find(filter, opts)
			.toArray()
			.then((result) => {
				return res.json({ list: result })
			})
			.catch(() => {
				return res.json({ list: [] })
			})
	})

	/**
	 * create new article
	 */
	router.post('/admin/article', auth, (req, res) => {
    const title = req.body.title
		const content = req.body.content
		const tags = req.body.tags || []
		const slug = shortid.generate()

    const collecton = db.collection('article')
    collecton
      .insertOne({
				slug,
				title,
				tags,
        content,
        user: req.user,
        createAt: new Date(),
        updateAt: new Date()
      })
      .then(result => {
        res.send({ status: true, id: result.insertedId, slug })
      })
      .catch(err => {
        res.send({ status: false, err })
      })
	})
	
	/**
	 * delete article
	 */
	router.delete('/admin/article/:id', auth, (req, res) => {
    const id = req.params.id
    const username = req.user.username
    const collecton = db.collection('article')
    collecton
      .findOne({ slug: id })
      .then(result => {
        if (!result) {
          return res.send({ status: false, message: 'article not found' })
        }

        if (result.user.username !== username) {
          return res
            .status(401)
            .send({ status: false, message: 'not authorized' })
        }

        return collecton.updateOne(
          { slug: id },
          { $set: { deleteAt: new Date() } }
        )
      })
      .then(result => {
        res.send({ status: result.result.ok > 0 })
      })
      .catch(err => {
        res.status(500).send({ status: false, err })
      })
	})
	

	/**
	 * update article
	 */
	router.post('/admin/article/:id', auth, (req, res) => {
    const id = req.params.id
    const title = req.body.title || false
		const content = req.body.content || false
		const tags = req.body.tags || false
    const username = req.user.username

    const updates = {}
    if (title !== false) {
      updates.title = title
    }
    if (content !== false) {
      updates.content = content
		}
		if (tags !== false) {
			updates.tags = tags
		}

    const collecton = db.collection('article')
    collecton
      .updateOne({ slug: id, 'user.username': username }, { $set: updates })
      .then(result => {
        res.send({ status: result.result.ok > 0 })
      })
      .catch(err => {
        res.send({ status: false, err })
      })
  })

	return router
}

module.exports = {
	default: getRouter
}