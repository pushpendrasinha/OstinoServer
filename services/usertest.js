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
        data.password = bcrypt.hashSync(data.password, 8);
        try {
          await new userModel(data).save();
            return({msg : "success"});
        } catch(e) {
            console.log("err in save " + e);
            return({msg : "failure with reason "  +e});
        }


    },
    changePassword: async (userId, data) => {
        var user = await userModel.findOne({_id: userId});
        var passwordIsValid = bcrypt.compareSync(data.oldpassword, user.password);
        if(passwordIsValid) {
            var password = bcrypt.hashSync(data.newPassword, 8);
          user.password = password;
          await user.save();
            return {msg: "password changed successfully"};
        } else {
            return {msg: "current password is invalid"}
        }

    },
    getuser: async (userId) => {
        var user = await userModel.findOne({_id: userId});
        return user;

        },
    addAddress: async (userId, address) => {
        var user = await userModel.findOne({"_id": userId});
       // user.address.unshift({"name": "hello", "contact":"9034856075"});
        user.address.unshift(address);
       await user.save(function(err, result) {
           if(err) {
               console.log("err in adress update ");
               return err;
           } else {
               console.log("address update result " + JSON.stringify(result, null, 2));
               return {"msg" : "address updated successfully"};
           }
       });
 /*await userModel.update({"name": "suraj"}, {$push :  {address: {"name": "aasheesh", "contact":"9034856075"}} }, function(err, result) {
     if(err) {
         console.log("err in adress update ");
         return err;
     } else {
         console.log("address update result " + JSON.stringify(result, null, 2));
         return {"msg" : "address updated successfully"};
     }
 })*/
},
    updateAddress: async (userId, address) => {
        var user = await userModel.findOne({"_id": userId});
        // user.address.unshift({"name": "hello", "contact":"9034856075"});
        user.address.unshift(address);
        await user.save(function(err, result) {
            if(err) {
                console.log("err in adress update ");
                return err;
            } else {
                console.log("address update result " + JSON.stringify(result, null, 2));
                return {"msg" : "address updated successfully"};
            }
        });
        /*await userModel.update({"name": "suraj"}, {$push :  {address: {"name": "aasheesh", "contact":"9034856075"}} }, function(err, result) {
            if(err) {
                console.log("err in adress update ");
                return err;
            } else {
                console.log("address update result " + JSON.stringify(result, null, 2));
                return {"msg" : "address updated successfully"};
            }
        })*/
    },
    deleteAddress: async (userId, address) => {
        var user = await userModel.findOne({"_id": userId});
        // user.address.unshift({"name": "hello", "contact":"9034856075"});
        user.address.unshift(address);
        await user.save(function(err, result) {
            if(err) {
                console.log("err in adress update ");
                return err;
            } else {
                console.log("address update result " + JSON.stringify(result, null, 2));
                return {"msg" : "address updated successfully"};
            }
        });
        /*await userModel.update({"name": "suraj"}, {$push :  {address: {"name": "aasheesh", "contact":"9034856075"}} }, function(err, result) {
            if(err) {
                console.log("err in adress update ");
                return err;
            } else {
                console.log("address update result " + JSON.stringify(result, null, 2));
                return {"msg" : "address updated successfully"};
            }
        })*/
    },
    editProfile: async (userId, data) => {
        userModel.update({ _id: userId }, { $set: data}, (err, doc) => {
            if(err) {
                return {error: err};
            }
            return {msg: "updated successfully"};
        });

    },
    getAddresses: async (userId) => {
      var result =  await userModel.findOne({_id: userId}).select("address -_id");
      return result;
    }
}