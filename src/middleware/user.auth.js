const jwt = require('jsonwebtoken')
const { findUserById } = require('../database/queries.js')
const db = require('../config/db.config.js')


const auth = async (req, res, next) => {
		try{
			const token = req.header('Authorization').replace('Bearer ', '')

			const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, { expiresIn: '24H'})

			db.query(findUserById, decoded.id, (err, user) => {
				req.token = token
				req.user = user
				next()
			})

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