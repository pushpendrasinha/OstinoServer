var express = require('express');
var router = express.Router();
var userController = require('../controllers/user');
var authenticate = require('../middlewares/authentication');


router.post('/login', userController.login);
router.post('/register', userController.register);
router.get('/getuser', authenticate, userController.getuser);
router.post('/changepassword', authenticate, userController.changePassword);
router.post('/addAddress', authenticate, userController.addAddress);
router.get('/deleteAddress', authenticate, userController.addAddress);
router.post('/updateAddress', authenticate,  userController.addAddress);
router.get('/getaddresses', authenticate,  userController.getAddresses);
router.post('/edit', authenticate, userController.editProfile);

module.exports = router;