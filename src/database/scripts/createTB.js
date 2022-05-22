const { createTB_users, createTB_properties, createTB_reports } = require('../queries.js')
const db_init = require('../../configs/db.config.js')

const createTables = () => {
	db_init.query(createTB_users, (err, _) => {
		err ? console.log('can not create table users!\n', err) : console.log("users table created")
	})

	db_init.query(createTB_properties, (err, _) => {
		err ? console.log('can not create table properties!\n', err) : console.log("properties table created")
	})

	db_init.query(createTB_reports, (err, _) => {
		err ? console.log('can not create table reports!\n', err) : console.log("reports table created")
	})
}

createTables()