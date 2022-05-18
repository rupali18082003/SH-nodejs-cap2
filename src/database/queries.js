
//user
const createDB = `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`

const dropDB = `DROP DATABASE IF EXISTS ${process.env.DB_NAME}`

const findUserById = `SELECT * FROM users WHERE user_id = ?`

const findUserByEmail = `SELECT * FROM users WHERE email = ?`

const createNewUser = `INSERT INTO users(first_name, last_name, email, password, phone, address, is_admin) VALUES(?, ?, ?, ?, ?, ?, ?)`


//property
const createTB_users = `
	CREATE TABLE IF NOT EXISTS users (
		user_id INT NOT NULL AUTO_INCREMENT, 
		first_name VARCHAR(25), 
		last_name VARCHAR(25), 
		email VARCHAR(30), 
		password VARCHAR(8), 
		phone VARCHAR(14), 
		address VARCHAR(100), 
		is_admin TINYINT(1), 
		PRIMARY KEY(user_id))
`
const createTB_properties = `
	CREATE TABLE IF NOT EXISTS properties (
		property_id INT NOT NULL AUTO_INCREMENT,
		item VARCHAR(90) NOT NULL,
		status VARCHAR(50) DEFAULT 'available' NOT NULL,
		price FLOAT NOT NULL,
		state VARCHAR(70) NOT NULL,
		city VARCHAR(100) NOT NULL,
		address VARCHAR(200) NOT NULL,
		image_url VARCHAR(200) NOT NULL,
		type VARCHAR(70) NOT NULL,
		created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
		PRIMARY KEY(property_id),
		user_id INT NOT NULL,
		CONSTRAINT fk_users FOREIGN KEY(user_id) REFERENCES users(user_id)
	)
`

const createNewProp = `INSERT INTO properties(user_id, item, status, price, state, city, address, image_url, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`

const findPropById = `SELECT * FROM properties WHERE property_id = ?`

const updatePropById = `UPDATE properties SET item = ?, status = ?, price = ?, state = ?, city = ?, address = ?, image_url = ?, type = ? WHERE property_id = ? `

const updateFun = (prop) => `UPDATE properties SET ${prop} = ? WHERE property_id = ?`

const updatePropByStatus = `UPDATE properties SET status = ? WHERE property_id = ?`

const deletePropById = `DELETE FROM properties WHERE property_id = ?`

const viewAll = `SELECT * FROM properties`

const findByType = `SELECT * FROM properties WHERE type = ?`

module.exports = {
	createDB,
	dropDB,
	findUserById,
	findUserByEmail,
	createNewUser,
	createTB_users,
	createTB_properties,
	createNewProp,
	findPropById,
	updatePropById,
	updateFun,
	updatePropByStatus,
	deletePropById,
	viewAll,
	findByType
}