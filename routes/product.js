var express = require('express');
var product = require("../controllers/product");
var router = express.Router();

router.get('/getProductsList', product.getProductsList);
router.get('/getProductInfo', product.getProductInfo);

module.exports = router;
