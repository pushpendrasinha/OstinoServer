const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var config = require('../util/config-util');
var mongoose = require('mongoose');
console.log("config is " + JSON.stringify(config.nodeConfig.get('mongo:url'), null, 2));
mongoose.connect(config.nodeConfig.get('mongo:url'));
var userModel = require("../models/user");
var verificationModel = require("../models/verification");
var subscriptionModel = require("../models/subscription");
var mailUtil = require("../util/sendEmail");
// var secret = "med%ostino?R";

module.exports = {
    login: async (email, password) => {
        // return {"msg": "this way is working ..."};
        try {
            console.log("email is " + email);
            var result = await userModel.findOne({email: email}).exec();
            console.log("result is " + result);
            if(!result) {
                return({error: `${email} is not registered`})
            } else {
                // var passwordIsValid = bcrypt.compareSync(password, result.password);
                var passwordIsValid = result.passwordIsValid(password);
                if(passwordIsValid) {
                    delete result.password;
                    if(result.verified == false) {
                        return { success: false, error: "Email is not verified"};
                    }
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
            //data.password = bcrypt.hashSync(data.password, 8);
            var result = await new userModel(data).save();
            // console.log("result is " + JSON.stringify(result, null, 2));
            console.log("save result is " + JSON.stringify(result, null, 2));
            var verify = {
                hash: result.password,
                userId: result._id
            }
            await new verificationModel(verify).save();

            mailUtil.sendMail({
                from: "medthatheals@gmail.com",
                to: result.email,
                subject: "Verify your email address",
                message: `<div style="display: flex;align-items: center;min-height:  100vh;background-color: #bbb;overflow: hidden;">
    <div style="background-color: #bbb;width: 95%;margin-left: auto;margin-right: auto;">
        <div>
            <div  style="text-align: center;padding: 20px;" >
                <img src="https://s3.ap-south-1.amazonaws.com/ostinohealth/static/logo/ostino_logo1.png" style="height: 40px;width: 200px;">
            </div>
            <div  style="text-align: center;background-color: white;border-radius: 3px;margin-left: auto;margin-right: auto;padding: 20px;">
                <h2>Please confirm your email</h2>
                <p style="font-size: 18px;">Thanks for signing up to Ostino! To set up your account, please confirm your email address by clicking the button below. </p>
                <div  style="background-color: #990000;	padding: 10px;text-align: center;width: 40%;margin-top: 10px;margin-left: auto;margin-right: auto;font-size: 16px;cursor: pointer;border-radius: 3px;">
                    <a href=${config.nodeConfig.get('server_url')}/api/user/verification?code=${verify.hash} style="text-decoration: none;color:white;">Confirm email address</a>
                </div>
            </div>
        </div>
        <div  style="text-align: center;padding: 20px;margin-left: auto;margin-right: auto;color:#404040;">
            <p>Button not working? Try using this link:</p>
            <a href=${config.nodeConfig.get('server_url')}/api/user/verification?code=${verify.hash} style="text-decoration: none;word-break: break-all;word-wrap: break-word;">${config.nodeConfig.get('server_url')}/api/user/verification?code=${verify.hash}</a>
            <p>You are receiving this email because you signed up to Ostino. If you did not make this request please contact <a href="mailto:contact@ostinohealth.com" style="color: #404040;">Ostino Support</a>  .</p>
        </div>
    </div>
</div>`
            })
            return({success: true, msg: "You are registered successfully & verification mail sent to ur mail id"});

        } catch(e) {
            console.log("caught " + JSON.stringify(e));
            return({success: false, msg: e.toString()});
            // reject({ success: false, msg: err});
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


    },

    verifyEmail: async (verificationCode) => {
        var user =  await verificationModel.findOne({hash: verificationCode});
        if(user) {
            var userId = user.userId;
            console.log("userId in verifyemail is " + userId);
            await userModel.updateOne({_id: userId}, { verified: true });
            return {success: true, msg: "email address is verified"}
        } else {
            return { success: false, msg: "Invalid or expired verification link"}
        }
    },

    requestresetpassword: async (email) => {
        var user = await userModel.findOne({email: email});
        if(!user) {
            return { success: false, msg: `${email} is not registered`}
        } else {
            var token = jwt.sign({id: user._id}, config.nodeConfig.get('secret'), {
                expiresIn: 86400 // expires in 24 hours
            });
            mailUtil.sendMail({
                from: "medthatheals@gmail.com",
                to: email,
                subject: "Reset Password",
                message: `<div style="display: flex;align-items: center;min-height:  100vh;background-color: #bbb;overflow: hidden;">
    <div style="background-color: #bbb;width: 95%;margin-left: auto;margin-right: auto;margin-bottom: 5%;">
        <div>
            <div style="text-align: center;padding: 20px;" >
                <img src="https://s3.ap-south-1.amazonaws.com/ostinohealth/static/logo/ostino_logo1.png" style="height: 40px;width: 200px;">
            </div>

            <div style="text-align: center;background-color: white;border-radius: 3px;margin-left: auto;margin-right: auto;padding: 20px;">
                <h1>Password Reset</h1>
                <p style="font-size: 18px;">You recently requested to reset your password for your Ostino account.Click the button below to reset it.</p>
                <div style="background-color: #990000;	padding: 10px;text-align: center;width: 40%;margin-top: 10px;margin-left: auto;margin-right: auto;font-size: 16px;cursor: pointer;border-radius: 3px;">
                    <a href=${config.nodeConfig.get('server_url')}/api/user/reset/${token} style="text-decoration: none;color:white;">Reset my password</a>
                </div>
                <p style="border-bottom: 1px solid #990000;padding: 20px;">If you did not request a password reset,please ignore this email or reply to let us know. </p>

                <p>If you're having troble clicking the passowrd reset button,copy and paste the url below into your web browser.
                    <br><br>
                    <a href=${config.nodeConfig.get('server_url')}/api/user/reset/${token} style="text-decoration: none;word-break: break-all;word-wrap: break-word;">${config.nodeConfig.get('server_url')}/api/user/reset/${token}</a></p>
            </div>
        </div>
    </div>
</div>
`
            })
            return { success: true, msg: "email sent to reset password"}
        }
    },
    resetpassword : async (token) => {
        try {
            var result =  await jwt.verify(token, config.nodeConfig.get('secret'));
            console.log("decoded token is " + JSON.stringify(result, null, 2));
            return {valid: true};
           } catch(e) {
            console.log("exception in token " + e);
            return {valid: false, msg: e};
        }

    },
    resetUserPassword: async(data) => {
        try {
            var result =  await jwt.verify(data.token, config.nodeConfig.get('secret'));
           // var user = await userModel.findOne({_id: result.id});
           // console.log("user in resetUserPassword " + JSON.stringify(user, null, 2));

                var newpassword = bcrypt.hashSync(data.password, 8);
                await userModel.updateOne({ _id: result.id }, {password: newpassword});
                return {success: true, msg: "password changed successfully."};
            /*} else {
                return {success: false, msg: "Invalid User"};
            }*/


           // console.log("decoded token is " + JSON.stringify(result, null, 2));

        } catch(e) {
            console.log("exception in token " + e);
            return {success: false, msg: e};
        }
    },
    subscribe: async (name, email) => {
        try {
            var token = jwt.sign({email: email}, config.nodeConfig.get('secret'), {
                expiresIn: 86400 // expires in 24 hours
            });
            var data = {
                from: 'contact@ostinohealth.com',
                to: email,
                subject: 'Email Subscription',
                message: `<div class="container"  style="display: flex;align-items: center;min-height:  100vh;background-color: #bbb;overflow: hidden;
">

    <div class="wrapper" style="background-color: #bbb;width: 95%;margin-left: auto;margin-right: auto;">

        <div class="box">
            <div class="logo" style="text-align: center;padding: 20px;" >
                <a href="https://www.ostinohealth.com/"><img class="logo" src="https://s3.ap-south-1.amazonaws.com/ostinohealth/static/logo/ostino_logo1.png" width="180px" height="30px"> </a>
            </div>

            <div class="box-content" style="text-align: center;background-color: white;border-radius: 3px;margin-left: auto;margin-right: auto;padding: 20px;">
                <h3>Hi ${name},</h3>
                <p style="font-size: 18px;">We have received a subscription request from this email address.  Please confirm it by clicking the button below.</p>
                <div class="button" style="background-color: #990000;	padding: 10px;text-align: center;width: 40%;margin-top: 10px;margin-left: auto;margin-right: auto;font-size: 16px;cursor: pointer;border-radius: 3px;">
                    <a href=${config.nodeConfig.get('server_url')}/api/user/subscription/${token} style="text-decoration: none;color:white;">Subscribe</a>
                </div>
                <p>If you still cannot subscribe, please copy this link and paste it in your browser :</p>

                <a href=${config.nodeConfig.get('server_url')}/api/user/reset/${token} style="text-decoration: none;word-break: break-all;word-wrap: break-word;">${config.nodeConfig.get('server_url')}/api/user/subscription/${token}</a>

                <p>Thank You </p>
            </div>
        </div>

    </div>
</div>`
            }
            mailUtil.sendMail(data);
            return { success: true, msg: "verify mail to subscribe"};
        } catch(e) {
            return { success: false, msg: e};
        }


    },

    subscription: async (token) => {
        try {
            var result =  await jwt.verify(token, config.nodeConfig.get('secret'));
            console.log("decoded token is " + JSON.stringify(result, null, 2));
            await new subscriptionModel({email: result.email}).save();
            return {success: true};
        } catch(e) {
            console.log("exception in token " + e);
            return {success: false, msg: e};
        }
    }

}

/*

message: `<h3>Verify your email address</h3> <br> <p>Please click on below link to verify your email address</p> <br>
               ${config.nodeConfig.get('server_url')}/api/user/verification?code=${verify.hash}`*/
