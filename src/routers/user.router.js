const router = require('express').Router()
const userController = require('../controllers/user.controller.js')

module.exports = app => {
	//register new user
	router.post('/signup', userController.signup)

	//signing in user
	router.post('/signin', userController.signin)

	app.use('/api/user', router)
}