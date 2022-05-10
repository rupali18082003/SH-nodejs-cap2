require('dotenv').config()
require('./src/config/db.config.js')
const express = require('express')

const app = express()
const port = process.env.PORT


app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
	console.log('Welcome to ApexHauz!')
})
require('./src/routers/user.router.js')(app)

app.listen(port, () => {
	console.log(`server runnint at port: ${port}`)
})