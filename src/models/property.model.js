const db = require('../config/db.config.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class Property {
	constructor (user_id, item, status, price, state, city, address, image_url, type, created_on) {
		this.item = item
		this.status = status
		this.price = price
		this.state = state
		this.city = city
		this.address = address
		this.image_url = image_url
		this.type = type
		this.user_id = user_id
		this.created_on = created_on
	}

	static create (newProp, result) {
		db.query('INSERT INTO properties(user_id, item, status, price, state, city, address, image_url, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [ 
							newProp.user_id,
							newProp.item, 
							newProp.status, 
							newProp.price, 
							newProp.state, 
							newProp.city, 
							newProp.address, 
							newProp.image_url, 
							newProp.type,
							], (err, res) => {
			if(err) result({
				status: 'error',
				message: err.message
			}, null)

			db.query('SELECT * FROM properties WHERE property_id = ?', [res.insertId], (err, data) => {
				console.log(res.insertId)
				result(null, {
					status: 'sucess',
					data
				})
			})

		})
	}

	static update (id, item, status, price, state, city, address, image_url, type, result) {
		if(item) {
			db.query('UPDATE properties SET item = ? WHERE property_id = ?', [item, id])
		}  

		if (status) {
			db.query('UPDATE properties SET status = ? WHERE property_id = ?', [status, id])
		}  

		if (price) {
			db.query('UPDATE properties SET price = ? WHERE property_id = ?', [price, id])
		}  

		if (state) {
			db.query('UPDATE properties SET state = ? WHERE property_id = ?', [state, id])
		}  

		if (city) {
			db.query('UPDATE properties SET city = ? WHERE property_id = ?', [city, id])
		}  

		if (address) {
			db.query('UPDATE properties SET address = ? WHERE property_id = ?', [address, id])
		}  

		if (image_url) {
			db.query('UPDATE properties SET image_url = ? WHERE property_id = ?', [image_url, id])
		}  

		if (type) {
			db.query('UPDATE properties SET type = ? WHERE property_id = ?', [type, id])

		} 

		db.query('SELECT * FROM properties WHERE property_id = ?', [id], (err, data) => {
			if(err) result({
				status: 'error',
				message: err.message
			}, null)

			result(null, {
				status: 'sucess',
				data
			})
		})
	}

	static delete(id, result) {
		db.query('SELECT * FROM properties WHERE property_id = ?', [id], (err, data) => {
			if(err) result({
				status: 'error', 
				message: err.message
			}, null)

			if(!data.length)
				result({
					status: 'error',
					message: 'property not found'
				}, null)

			db.query('DELETE FROM properties WHERE property_id = ?', [id], (err, res) => {
				if(err) result({
					status: 'error',
					message: err.message
				}, null)

				console.log("response: ", res)

				result(null, {
					status: 'success',
					data
				})
			})
		})
	}

	static findById(id, result) {
		db.query('SELECT * FROM properties WHERE property_id = ?', [id], (err, data) => {
			if(err) 
				result({
					status: 'error',
					message: err.message
				}, null)
			else if(!data.length)
				result({
					status: 'error',
					message: 'property not found'
				}, null)

			result(null, {
				status: 'sucess',
				data
			})

		})
	}

	static viewAll(result) {
		db.query('SELECT * FROM properties', (err, data) => {
			if(err) 
				result({
					status: 'error',
					message: err.message
				}, null)
			else if(!data.length)
				result({
					status: 'error',
					message: 'data not found'
				}, null)

			result(null, {
				status: 'sucess',
				data
			})

		})
	}

	static searchByType(type, result) {
		db.query('SELECT * FROM properties WHERE type = ?', [type], (err, data) => {
			if(err) 
				result({
					status: 'error',
					message: 'data not found'
				}, null)

			result(null, {
					status: 'success',
					data
				})
		})
	}
}

module.exports = Property