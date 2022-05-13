const PropertyAdvert  = require('../models/pAdvert.model.js')

exports.create = (req, res) => {
	if(!req.body){
		res.status(400).send({
			status: 'error',
			message: 'Body can not be empty'
		})
	}

	res.status(200).send({
		status: 'success',
		message: 'Let it be'
	})
}
