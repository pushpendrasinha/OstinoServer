var express = require('express');
var router = express.Router();
var paymentController = require('../controllers/payment');
var authenticate = require('../middlewares/authentication');



router.get('/checkoutpage', authenticate, paymentController.checkoutPage);
router.post('/paymentresponse', paymentController.paymentResponse);



module.exports = router;