const Property  = require('../models/property.model.js')

exports.create = (req, res) => {
	if(!req.body){
		res.status(400).send({
			status: 'error',
			message: 'Body can not be empty'
		})
	}

	const { user_id, item, status, price, state, city, address, image_url, type, created_on } = req.body
	const property = new Property(user_id, item, status, price, state, city, address, image_url, type, created_on )

	Property.create(property, (err, data) => {
		if(err) {
			res.send(err)
		}

		res.status(200).send(data)
	})
}

exports.update = (req, res) => {
	if(!req.body) {
		res.status(400).send({
			status: 'error',
			message: 'Body can not be empty'
		})
	}

	const id = req.params.id

	const {item, status, price, state, city, address, image_url, type } = req.body

	Property.update(id, item, status, price, state, city, address, image_url, type, (err, data) => {
		if(err) res.status(400).send(err)

		res.send(data)
	})
}

exports.delete = (req, res) => {
	const id = req.params.id 

	Property.delete(id, (err, data) => {
		if(err) res.status(404).send(err)

		res.send(data)
	})
}

exports.findById = (req, res) => {
	const id = req.params.id

	Property.findById(id, (err, data) => {
		if(err) res.status(404).send(err)

		res.send(data)
	})
}

exports.viewAll = (req, res) => {
	Property.viewAll((err, data) => {
		if(err) res.status(404).send(err)

		res.send(data)
	})
}

exports.searchByType = (req, res) => {
	const type = req.query.type

	Property.searchByType(type, (err, data) => {
		if(err) res.send(err)

		res.send(data)
	})
}