const {User} = require('../models/user.mdoel.js')

//creating new user
exports.create = (req, res) => {
	if(!req.body){
		res.status(500).send({
			message: 'Invalid request'
		})
	}

	const {first_name, last_name, email, password, phone, address, is_admin} = req.body
	const user = new User(first_name, last_name, email, password, phone, address, is_admin)

	//saving user's data in database
	User.create(user, (err, data) => {
		if(err) {
			res.status(500).send({
				message: err.message
			})
		}

		console.log(data)
		res.status(200).send(data)
	})
}
