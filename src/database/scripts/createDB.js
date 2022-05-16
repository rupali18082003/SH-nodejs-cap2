const { createDB } = require('../queries.js')

const createDatabase = () => {
	require('../../config/db.config.init.js').query(createDB, (err, _) => {
		if(err) console.log("create db error: ",err)

		console.log("database created!")
	})
}

createDatabase()