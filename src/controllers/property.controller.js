const Property  = require('../models/property.model.js')

exports.create = (req, res) => {
	if(!req.body){
		res.status(400).send({
			status: 'error',
			message: 'Body can not be empty'
		})
	}

	const { item, status, price, state, city, address, image_url, type, created_on } = req.body
	const property = new Property(req.user[0].user_id, item, status, price, state, city, address, image_url, type, created_on )

	Property.create(property, (err, data) => {
		if(err) return res.send(err)

		return res.status(200).send(data)
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

	Property.update(id, req.body, (err, data) => {
		if(err) return res.status(400).send(err)

		return res.send(data)
	})
}

exports.updateStatus = (req, res) => {
	if(!req.body) {
		res.status(400).send({
			status: 'error',
			message: 'Please update status'
		})
	}

	const id = req.params.id
	const { status } = req.body

	Property.updateStatus(id, status, (err, data) => {
		if(err) return res.status(400).send(err)

		return res.send(data)
	})

}

exports.delete = (req, res) => {
	const id = req.params.id 

	Property.delete(id, (err, data) => {
		if(err) return res.status(404).send(err)

		return res.send(data)
	})
}

exports.findById = (req, res) => {
	const id = req.params.id

	Property.findById(id, (err, data) => {
		if(err) return res.status(404).send(err)

		return res.send(data)
	})
}

exports.viewAll = (req, res) => {
	Property.viewAll((err, data) => {
		if(err) return res.status(404).send(err)

		return res.send(data)
	})
}

exports.findByType = (req, res) => {
	const type = req.query.type

	Property.findByType(type, (err, data) => {
		if(err) return res.send(err)

		return res.send(data)
	})
}