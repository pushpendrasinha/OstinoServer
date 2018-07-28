const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var config = require('../util/config-util');
var mongoose = require('mongoose');
console.log("config is " + JSON.stringify(config.nodeConfig.get('mongo:url'), null, 2));
mongoose.connect(config.nodeConfig.get('mongo:url'));
var userModel = require("../models/user");
// var secret = "med%ostino?R";

module.exports = {
    login: async (email, password) => {
       // return {"msg": "this way is working ..."};
      try {
          console.log("email is " + email);
          var result = await userModel.findOne({email: email});
          console.log("result is " + result);
          if(!result) {
              return({error: `${email} is not registered`})
          } else {
              var passwordIsValid = bcrypt.compareSync(password, result.password);
              if(passwordIsValid) {
                  delete result.password;

                  var token = jwt.sign({id : result._id }, config.nodeConfig.get('secret'), {
                      expiresIn: 86400 // expires in 24 hours
                  });
                  return({token: token, user: result});
              } else {
                  return({token: null, error: "Invalid Password"})
              }
          }
      } catch(e) {
          console.log("exception in login "  +e);
      }
    },
    register: async (data) => {
        console.log("register data in service " + JSON.stringify(data, null, 2));
        try {
            data.password = bcrypt.hashSync(data.password, 8);
            await new userModel(data).save();
            return({success: true, msg: "You are registered successfully"});
        } catch(e) {
            return({success: false, msg: e});
        }
        },
    changePassword: async (userId, data) => {
        console.log("userid is " + userId);
        var user = await userModel.findOne({_id: userId});
        var passwordIsValid = bcrypt.compareSync(data.currentPassword, user.password);
        if(passwordIsValid) {
            if(data.currentPassword == data.newPassword) {
                return {success: false, msg: "New password cannot be same as current password"};
            } else {
                var password = bcrypt.hashSync(data.newPassword, 8);
                user.password = password;
                await user.save();
                return {success: true, msg: "password changed successfully"};
            }

        } else {
            return {success: false, msg: "current password is invalid"}
        }

    },
    getuser: async (userId) => {
        try {
            var user = await userModel.findOne({_id: userId});
            return {success: true, user: user};
        } catch(e) {
            return { success: false, msg: e};
        }


        },

    editProfile: async (userId, data) => {
        try {
            delete data.email;
            delete data.password;
           await userModel.updateOne({ _id: userId }, data);
           return {success: true, msg: "profile updated successfully"}
           } catch(e) {
            return {success: false, msg: e}
        }


    }

}