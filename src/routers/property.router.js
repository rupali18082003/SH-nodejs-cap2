const router = require('express').Router()
const propertyController = require('../controllers/property.controller.js')
const { auth } = require('../middleware/user.auth.js')

module.exports = app => {
	//creating property 
	router.post('/create', auth, propertyController.create)

	//updating property 
	router.patch('/update/:id', auth, propertyController.update)

	//mark a property as sold/available 
	router.patch('/updateStatus/:id', auth, propertyController.updateStatus)
	
	//deleting property
	router.delete('/delete/:id', auth, propertyController.delete)

	//find property by ID
	router.get('/findById/:id', auth, propertyController.findById)

	//view all properties
	router.get('/viewAll', auth, propertyController.viewAll)

	//search property by type
	router.get('/search', auth, propertyController.findByType)

	app.use('/property', router)
}