var mongoUtil = require("../util/mongo");
const {ObjectId} = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var config = require('../config/config');
var collection = 'users';
var userModel = require("../models/user");
// var secret = "med%ostino?R";

module.exports = {
    login: async (email, password) => {
        console.log("email " + email);
        var result = await mongoUtil.findRecord(collection, {email: email});
        console.log("result is " + JSON.stringify(result,null,2));
        if(result.length == 0) {
            return({error: `${email} is not registered`})
        } else {
            var passwordIsValid = bcrypt.compareSync(password, result[0].password);
            if(passwordIsValid) {
                delete result[0].password;

                var token = jwt.sign({id : result[0]._id }, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                return({token: token, user: result[0]});
            } else {
                return({token: null, error: "Invalid Password"})
            }
        }
    },
    register: async (data) => {
        data.password = bcrypt.hashSync(data.password, 8);
        var result = await mongoUtil.createRecord('User', data);
        return({msg : "success"});
},
    changePassword: async (userId, data) => {
       var user = await mongoUtil.findOne(collection, {_id: userId});
        var passwordIsValid = bcrypt.compareSync(data.oldpassword, result.password);
        if(passwordIsValid) {
            var password = bcrypt.hashSync(data.newPassword, 8);
            var query = {_id: userId};
            var values = {$set: {password: password}};
           var result = await mongoUtil.updateRecord(collection, query, values);
           return {msg: "password changed successfully"};
        } else {
            return {msg: "current password is invalid"}
        }

    },
    editProfile: async (userId, data) => {

            var query = {_id: userId};
            var values = {$set: data};
            var result = await mongoUtil.updateRecord(collection, query, values);
            return {msg: "updated successfully"};
            }
}