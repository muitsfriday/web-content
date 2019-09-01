export default (req, res) => {
	const { username, password } = req.body
	const username = req.body.username
	const password = req.body.password
	res.status(200).json({
		username: username,
		password: password
	})
}