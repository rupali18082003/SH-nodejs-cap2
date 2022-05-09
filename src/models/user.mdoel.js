const db = require('../config/db.config.js')
const bcrypt = require('bcrypt')

class User {
	constructor(first_name, last_name, email, password, phone, address, is_admin) {
		this.first_name = first_name 
		this.last_name = last_name
		this.email = email 
		this.password = password
		this.phone = phone
		this.address = address
		this.is_admin = is_admin
	}

	//signing up
	static create (newUser, result) {
		const saltRounds = 10

		//hashing password
		bcrypt.hash(newUser.password, saltRounds, (err, hash) => {
		 	if(err) throw err

		 	db.query('INSERT INTO users(first_name, last_name, email, password, phone, address, is_admin) VALUES(?, ?, ?, ?, ?, ?, ?)', [newUser.first_name, newUser.last_name, newUser.email, hash, newUser.phone, newUser.address, newUser.is_admin], (err, res) => {
				if(err) {
					throw err
					result(err, null)
					return
				}

				console.log('User created: ', {...newUser})
				result(null, { id: res.insertId, ...newUser})
			})
		 })		
	}
}


module.exports = {
	User
}