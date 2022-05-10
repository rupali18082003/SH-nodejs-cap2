const { Signup, Signin } = require('../models/user.model.js')
const router = require('express').Router()

module.exports = app => {
	//register new user
	router.post('/signup', (req, res) => {
		if(!req.body){
			res.status(500).send({
				message: 'Invalid request'
			})
		}

		const {first_name, last_name, email, password, phone, address, is_admin} = req.body
		const user = new Signup(first_name, last_name, email, password, phone, address, is_admin)

		//saving user's data in database
		Signup.create(user, (err, data) => {
			if(err) {
				res.status(500).send(err)
			}

			console.log(data)
			res.status(200).send(data)
		})
	})

	//signing in user
	router.post('/signin', (req, res) => {
		if(!req.body) {
			res.status(500).send({
				message: 'Invalid data'
			})
		}

		const {email, password} = req.body
		const user = new Signin(email, password)

		Signin.signin (user, (err, data) => {
			if(err) {
				res.status(500).send(err)
			} else {
				res.status(200).send(data)
			}
			
		})
	})
	app.use('/api/user', router)
}