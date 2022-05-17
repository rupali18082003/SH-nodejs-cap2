const { dropDB } = require('../queries.js')

const dropDatabase = () => {
	require('../../configs/db.config.init.js').query(dropDB, (err, _) => {
		if(err) console.log("drop db error: ",err)

		console.log("database dropped!")
	})
}

dropDatabase()