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
router.get('/verification', userController.verifyEmail);
router.get('/requestresetpassword', userController.requestresetpassword);
router.get('/reset/:token', userController.resetPassword);
router.post('/resetpassword', userController.resetUserPassword);
router.get('/test', userController.test);
router.post('/subscribe', userController.subscribe);
router.get('/subscription/:token', userController.subscription);

module.exports = router;