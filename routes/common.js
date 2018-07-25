var express = require('express');
var router = express.Router();
var path = require('path');
var commonController = require('../controllers/common');

router.post('/feedback', commonController.submitFeedback);


module.exports = router;
