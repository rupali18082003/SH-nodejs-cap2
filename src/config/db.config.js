const mysql = require('mysql')

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'sh_nodejs_cap2'
})

db.connect((err) => {
	if(err) throw err

	console.log("Connected!")	
})

module.exports = db