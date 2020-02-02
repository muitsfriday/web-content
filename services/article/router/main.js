const router = require('express').Router()
const auth = require('../middleware/auth').default

function getRouter(db) {

  /**
   * list article
   */
  router.get('/', (req, res) => {
    const collecton = db.collection('article')
    const getArticlesTask = collecton
      .find(
        {
          deleteAt: { $exists: false }
        },
        {
          projection: { content: 0 }
        }
      )
      .toArray()

    getArticlesTask
      .then(result => {
        res.send({ list: result })
      })
      .catch(err => {
        res.send({ list: [], err: err })
      })
  })

  /**
   * get article by id
   */
  router.get('/:id', (req, res) => {
    const id = req.params.id
    const collecton = db.collection('article')

    collecton
      .findOne({
        slug: id,
        deleteAt: { $exists: false }
      })
      .then(result => {
        res.status(result ? 200 : 404).send({ data: result })
      })
      .catch(err => {
        res.status(500).send({ data: null, err: err })
      })
  })

	return router
}


module.exports = {
	default: getRouter
}