const axios = require('axios').default


export default (req, res) => {

	const { username, password } = req.body

	axios.post(`${process.env.USER_API_PATH}/auth`, { 
		username, 
		password 
	}).then(response => {
		if (!response.data.token) {
			return res.status(200).json({
				status: false,
				error: response.data.message
			})
		}

		res.status(200).json({
			status: true,
			jwt: response.data.token
		})
	})
}