const db = require('../config/db.config.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class Signup {
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
		db.query('SELECT * FROM users WHERE email = ?', [newUser.email], (err, res) => {
			console.log('RES: ', res)
			if(res.length) {
				result({
					status: "error",
					message: "Email is already in use!"
				}, null)
			} else {
				const saltRounds = 10

				//hashing password
				bcrypt.hash(newUser.password, saltRounds, (err, hash) => {
				 	if(err) {
				 		throw err
				 		result({
				 			status: "error",
				 			message: err.message
				 		}, null)
				 	}

				 	db.query('INSERT INTO users(first_name, last_name, email, password, phone, address, is_admin) VALUES(?, ?, ?, ?, ?, ?, ?)', [newUser.first_name, newUser.last_name, newUser.email, hash, newUser.phone, newUser.address, newUser.is_admin], (err, res) => {
						if(err) {
							throw err
							result({
								status: "error",
								message: 'something went wrong, can not register user.'
							}, null)
							return
						}

						console.log('User created: ', {...newUser})
						result(null, { 
							status: "success",
							data: {
								id: res.insertId, 
								...newUser
							}
						})
					})
				})
			}

		 })		
	}
}

class Signin {
	constructor(email, password) {
		this.email = email
		this.password = password
	}

	static signin(user, result) {
		db.query('SELECT * FROM users WHERE email = ?', [user.email], (err, res) => {
			if(err) {
				throw err
				result({
					status: "error",
					message: 'user does not exist.'
				}, null)
			}
			
			if(!res.length) {
				result({
					status: "error",
					message: "Invalid email or password."
				}, null)
			} else {
				bcrypt.compare(user.password, res[0].password, (err, data) => {
					if (err) {
						throw err
						result({
							status: "error",
							message: 'Invalid email or password.'
						}, null)
					}

					if (data) {
						//generating authentication token for 24 Hours
						const token = jwt.sign({ id: res[0].id }, process.env.JWT_SECRET_KEY, {expiresIn: '24h'})

						result(null, {
							status: "success",
							user,
							token
						})
					} else {
						result({
							status: "error",
							message: "Invalid password"
						}, null)
					}
				})
			}
		})

	}
}


module.exports = {
	Signup,
	Signin
}