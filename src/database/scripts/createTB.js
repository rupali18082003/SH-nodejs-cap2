const { createTB_users, createTB_properties } = require('../queries.js')
const db_init = require('../../configs/db.config.js')

const createTables = () => {
	db_init.query(createTB_users, (err, _) => {
		if(err) console.log("create table users error: ",err)

		console.log("user table created!")
	})

	db_init.query(createTB_properties, (err, _) => {
		if(err) console.log("create table properties error: ",err)

		console.log("properties table created!")
	})
}

createTables()