const User  = require('../models/user.model.js')

exports.signup = (req, res) => {
	if(!req.body){
		res.status(400).send({
			status: 'error',
			message: 'Body can not be empty'
		})
	}

	const { first_name, last_name, email, password, phone, address, is_admin } = req.body
	const user = new User(first_name, last_name, email, password, phone, address, is_admin)

	//saving user's data in database
	User.signup(user, (err, data) => {
		if(err) return res.status(500).send(err)

		return res.status(200).send(data)
	})	
	
}

exports.signin = (req, res) => {
	if(!req.body) {
		res.status(500).send({
			message: 'Invalid data'
		})
	}	

	const { email, password } = req.body

	User.signin ({ email, password }, (err, data) => {
		if(err) return res.status(500).send(err)

		res.status(200).send(data)
	})
}
