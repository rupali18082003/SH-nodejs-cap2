const router = require('express').Router()
const pAdvertController = require('../controllers/pAdvert.controller.js')
const { auth } = require('../middleware/user.auth.js')

module.exports = app => {
	//creating property advert
	router.post('/create', auth, pAdvertController.create)

	// //updating property advert + mark his/her property as sold
	// router.patch('/update', auth, pAdvertController.update)
	
	// //deleting property advert
	// router.delete('/delete', auth, pAdvertController.delete)

	// //view all property adverts
	// router.get('/viewAll', auth, pAdvertController.viewAll)

	// //view all properties of a specific type - 2 bedrooms, 3 bedrooms, mini flat etc
	// router.get('/viewAllSpecificTypeProperty', auth, pAdvertController.viewAll)

	// //view specific property
	// router.get('/viewSpecificProperty', auth, pAdvertController.update)

	app.use('/api/user/pAdvert', router)
}