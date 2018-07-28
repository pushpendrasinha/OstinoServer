var mongoUtil = require("../util/mongo-util");
const {ObjectId} = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var config = require('../config/config');
var collection = 'products';
// var secret = "med%ostino?R";

module.exports = {
    myOrders: async () => {

        return [];
    }


}