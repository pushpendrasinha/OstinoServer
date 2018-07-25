
var userService = require("../services/usertest");
module.exports = {
    login: async (req, res) => {
        var email = req.body.email;
        var password = req.body.password;
        var result = await userService.login(email, password).catch((err) => {
            console.log("err is " + err);
        });
        console.log("result in controller " + JSON.stringify(result));
        res.status(200).send(result);
    },
    register: async (req, res) => {
        console.log("in register function");
        var data = req.body;
        var result = await userService.register(data).catch((err) => {
            console.log("err is " + err);
        });
        console.log("result in controller " + JSON.stringify(result));
        res.status(200).send(result);
    },
    changePassword: async (req, res) => {
var credentials = req.body.credentials;
var userId = req.userId;
var result =  await userService.changePassword(userId, credentials);
        res.status(200).send(result);
    },

    addAddress: async (req, res) => {
        var addressInfo = req.body.addressInfo;
        var result = await userService.addAddress(addressInfo);
        console.log("add address result is " + result);
        res.status(200).send(result);

    },
    updateAddress: async (req, res) => {
        var addressInfo = req.body.addressInfo;
        var addressID = req.body.addressID;
        var result = await userService.updateAddress(addressInfo);
        console.log("add address result is " + result);
        res.status(200).send(result);

    },
    deleteAddress: async (req, res) => {
        var addressID = req.query.addressID;
        var result = await userService.deleteAddress(addressID);
        console.log("add address result is " + result);
        res.status(200).send(result);

    },

    getuser: async (req, res) => {
        var userId = req.userId;
        console.log("userid in getuser in controller " + userId);
        var result = await userService.getuser(userId);
        delete result.password;
        console.log("get user result is  " + JSON.stringify(result, null, 2));
        res.status(200).send({user: result});

    },
    editProfile: async (req, res) => {
        var data = req.body.data;
        var userId = req.userId;
        var result =  await userService.editProfile(userId, data);
        res.status(200).send(result);

    },
    getAddresses: async (req, res) => {
        var userId = req.userId;
        var result =  await userService.getAddresses(userId);
        res.status(200).send(result);

    }


}