const router = require('express').Router()
const userController = require('../controllers/user.controller.js')
const { signupValidation, signinValidation } = require('../validation/user.validation.js')

module.exports = app => {
	//register new user
	router.post('/signup', signupValidation, userController.signup)

	//signing in user
	router.post('/signin', signinValidation, userController.signin)

	app.use('/auth', router)
}