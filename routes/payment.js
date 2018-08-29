var express = require('express');
var router = express.Router();
var paymentController = require('../controllers/payment');
var authenticate = require('../middlewares/authentication');



router.get('/checkoutpage/:addressId', authenticate, paymentController.checkoutPage);
router.post('/paymentresponse', paymentController.paymentResponse);
/*router.get('/paymentresponse', paymentController.paymentResponse);*/
router.get('/test', paymentController.test);

module.exports = router;