var express = require('express');
var router = express.Router();
var addressController = require('../controllers/address');
var authenticate = require('../middlewares/authentication');



router.post('/addAddress', authenticate, addressController.addAddress);
router.post('/updateAddress', authenticate, addressController.updateAddress);
router.get('/deleteAddress', authenticate, addressController.deleteAddress);
router.get('/getAddresses', authenticate, addressController.getAddresses);


module.exports = router;