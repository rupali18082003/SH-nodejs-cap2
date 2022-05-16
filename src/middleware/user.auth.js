const jwt = require('jsonwebtoken')
const User  = require('../models/user.model.js')

const auth = async (req, res, next) => {
		try{
			const token = req.header('Authorization').replace('Bearer ', '')

			const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, { expiresIn: '24H'})

			const user = await User.findById(decoded.id)

			req.token = token
			req.user = user
			return next()
		} catch (err) {
			res.status(400).send({
				status: 'error',
				message: 'Invalid token'
			})
		}
}

module.exports = {
	auth
}