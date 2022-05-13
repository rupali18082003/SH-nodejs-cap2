require('dotenv').config()
require('./src/config/db.config.js')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
	console.log('Welcome to ApexHauz!')
})

require('./src/routers/user.router.js')(app)
require('./src/routers/pAdvert.router.js')(app)

app.listen(port, () => {
	console.log(`server runnint at port: ${port}`)
})