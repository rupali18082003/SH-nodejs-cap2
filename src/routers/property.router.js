const router = require('express').Router()
const propertyController = require('../controllers/property.controller.js')
const { auth } = require('../middleware/user.auth.js')

module.exports = app => {
	//creating property advert
	router.post('/create', auth, propertyController.create)

	//updating property advert + mark his/her property as sold
	router.patch('/update/:id', auth, propertyController.update)
	
	//deleting property advert
	router.delete('/delete/:id', auth, propertyController.delete)

	//find property by ID
	router.get('/findById/:id', auth, propertyController.findById)

	//view all property adverts
	router.get('/viewAll', auth, propertyController.viewAll)

	//search property by type
	router.get('/search', auth, propertyController.searchByType)

	app.use('/property', router)
}