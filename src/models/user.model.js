const db = require('../configs/db.config.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const  validate  = require('../validation/user.validation.js')
const { getToken } = require('../middleware/get-jwt-token.js')
const { findUserById, findUserByEmail, createNewUser } = require('../database/queries.js')

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
		db.query(findUserByEmail, [newUser.email], (err, res) => {
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

				 	db.query(createNewUser, [newUser.first_name, newUser.last_name, newUser.email, hash, newUser.phone, newUser.address, newUser.is_admin], (err, res) => {
						if(err) {
							result({
								status: "error",
								message: 'something went wrong, can not register user.'
							}, null)
						}

						const token = getToken( res.insertId )

						result(null, { 
							status: "success",
							data: {
								id: res.insertId, 
								token,
								first_name: newUser.first_name,
								last_name: newUser.last_name,
								email: newUser.email
							}
						})
					})
				})
			}

		 })		
	}

	//signing in
	static signin ({ email, password }, result) {
		db.query(findUserByEmail, [email], (err, res) => {
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
						const token = getToken( res[0].user_id )

						db.query(findUserById, res[0].user_id, (err, user) => {
							if(err) throw err

							result(null, {
								status: "success",
								data: {
									token, 
									id: user[0].user_id,
									first_name: user[0].first_name,
									last_name: user[0].last_name,
									email: user[0].email
								}
							})

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

module.exports = User