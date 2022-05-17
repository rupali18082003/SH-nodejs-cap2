const router = require('express').Router()
const propertyController = require('../controllers/property.controller.js')
const { auth } = require('../middleware/user.auth.js')

module.exports = app => {
	//creating property advert
	router.post('/create', auth, propertyController.create)

	//updating property 
	router.patch('/update/:id', auth, propertyController.update)

	//mark property as sold/available 
	router.patch('/updateStatus/:id', auth, propertyController.updateStatus)
	
	//deleting property advert
	router.delete('/delete/:id', auth, propertyController.delete)

	//find property by ID
	router.get('/findById/:id', auth, propertyController.findById)

	//view all property adverts
	router.get('/viewAll', auth, propertyController.viewAll)

	//search property by type
	router.get('/search', auth, propertyController.findByType)

	app.use('/property', router)
}