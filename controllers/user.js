
var userService = require("../services/usertest");
var config = require('../util/config-util').nodeConfig;
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
        req.checkBody()
        var data = req.body;
        var result = await userService.register(data).catch((err) => {
            console.log("err in register " + JSON.stringify(err, null, 2));
            res.status(200).send(result);
        });
        console.log("result in controller " + JSON.stringify(result));
        res.status(200).send(result);
    },
    changePassword: async (req, res) => {
var credentials = req.body;
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
        delete result.user.password;
        console.log("get user result is  " + JSON.stringify(result, null, 2));
        res.status(200).send(result);

    },
    editProfile: async (req, res) => {
        var data = req.body;
        var userId = req.userId;
        var result =  await userService.editProfile(userId, data);
        res.status(200).send(result);

    },
    getAddresses: async (req, res) => {
        var userId = req.userId;
        var result =  await userService.getAddresses(userId);
        res.status(200).send(result);

    },
    verifyEmail: async (req, res) => {
        console.log("verifyemail called");
        var code = req.query.code;
        console.log("code is " + code);
        console.log("query in verifyEmail is " + JSON.stringify(req.query, null, 2));
        var result = await userService.verifyEmail(code);
        if(result.success) {
            res.render('verification', {url: config.get('server_url')});
        } else {
            res.send("something went wrong");
        }
       // res.status(200).send("Your email address is verified");

    },
    requestresetpassword: async (req, res) => {
        console.log("requestresetpassword api called.....");
       var email = req.query.email;
      // res.render();
       var result = await userService.requestresetpassword(email);
       res.status(200).send(result);
    },

    resetPassword: async (req, res) => {
        var token = req.params.token;
        var result = await userService.resetpassword(token);
        if(result.valid) {
            res.render("resetpassword", {url: config.get('server_url')});
        } else {
            res.send("Invalid or expired Link")
           // res.render("<h3>Invalid or expired link</h3>");
        }


    },
    resetUserPassword: async (req, res) => {
        console.log("resetUserPassword api called.....");
        console.log("resetUserPassword body is " + JSON.stringify(req.body, null, 2));
        var result =  await userService.resetUserPassword(req.body);
        if(result.success) {
            res.redirect("http://localhost:3002/ecom/login");
        } else {
            res.send("something went wrong.")
        }
       // res.render('resetpassword');
    },

    test: async (req, res) => {

        res.render('resetpassword');
    },

    subscribe: async (req, res) => {
        var name = req.body.name;
        var email = req.body.email;
        var result = await userService.subscribe(name, email);
        res.status(200).send(result);
    },

    subscription: async (req, res) => {
        var token = req.params.token;
        var result = await userService.subscription(token);
        if(result.success) {
            res.render('subscription');
        }
         else {
         res.send('something went wrong');
        }
    }


}