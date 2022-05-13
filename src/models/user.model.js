const db = require('../config/db.config.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const  validate  = require('../validation/user.validation.js')
const { getToken } = require('../middleware/get-jwt-token.js')

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
	static signup (newUser, result) {
		const isValid = validate (newUser.first_name, newUser.last_name, newUser.email, newUser.password, newUser.phone, newUser.address, newUser.is_admin)
		if(isValid === 1){
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
		} else {
			result(isValid, null)
		}
	}

	//signing in
	static signin ({ email, password }, result) {
		db.query('SELECT * FROM users WHERE email = ?', [email], (err, res) => {
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
				bcrypt.compare(password, res[0].password, (err, data) => {
					if (err) {
						throw err
						result({
							status: "error",
							message: 'Invalid email or password.'
						}, null)
					}

					if (data) {
						const token = getToken( res[0].id )

						result(null, {
							status: "success",
							email,
							password,
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

	//find user by email
	static findByEmail (id) {
		db.query('SELECT * FROM users WHERE user_id = ?', [id])
	}
}

module.exports = User