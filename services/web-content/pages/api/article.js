const axios = require('axios').default

export default (req, res) => {
	axios.get(`${process.env.ARTICLE_API_PATH}/`).then(response => {
		if (response.status !== 200) {
			return res.json({
				status: false,
				data: []
			})
		}

		return res.json({
			status: true,
			data: response.data.list
		})
	}).catch(console.error)
}