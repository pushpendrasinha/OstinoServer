var express = require('express');
var router = express.Router();
var orderController = require('../controllers/order');
var authenticate = require('../middlewares/authentication');

router.get('/myorders', authenticate,  orderController.myOrders);


module.exports = router;