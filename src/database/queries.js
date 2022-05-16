const createDB = `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`

const dropDB = `DROP DATABASE IF EXISTS ${process.env.DB_NAME}`

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
		item VARCHAR(90),
		status VARCHAR(50) DEFAULT 'available',
		price FLOAT NOT NULL,
		state VARCHAR(70) NOT NULL,
		city VARCHAR(100) NOT NULL,
		address VARCHAR(200) NOT NULL,
		image_url VARCHAR(200) NOT NULL,
		created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
		PRIMARY KEY(property_id),
		user_id INT,
		CONSTRAINT fk_users FOREIGN KEY(user_id) REFERENCES users(user_id)
	)
`

module.exports = {
	createDB,
	dropDB,
	createTB_users,
	createTB_properties
}