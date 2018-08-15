var express = require('express');
var router = express.Router();
var cartController = require('../controllers/cart');
var authenticate = require('../middlewares/authentication');

//router.use(authenticate);

router.post('/addproduct', authenticate, cartController.addProduct);
router.post('/removeproduct', authenticate, cartController.removeProduct);
router.get('/viewcart', authenticate, cartController.viewCart);
router.post('/update', authenticate, cartController.updateCart);


module.exports = router;