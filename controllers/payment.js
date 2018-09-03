var paymentService = require("../services/payment");
const ccav = require('../util/ccavutil.js');
const qs = require('querystring');
var request = require('request-promise');
var transactionModel = require("../models/transaction");
var path = require('path');
var config = require('../util/config-util').nodeConfig;

console.log("dirname is " + __dirname);

module.exports = {
    checkoutPage: async (req, res) => {
        console.log("in api +++++++++++++++++++++");
        try {
            var userId = req.userId;
            var addressId = req.params.addressId;
           // delivery_address_id = req.body.address_id;
           // delivery_address_id = "5b767aefb06e842abc161f36";
            delivery_address_id = addressId;
            var result =   await paymentService.checkout(userId, delivery_address_id);
            res.status(200).send(result);
            //res.sendFile(path.resolve(__dirname + "/../public/page.html"));
           // res.send("https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction&merchant_id=176047&encRequest=7401b4b234bb932be57048b0a36c9f47c1ea1c206d250eb64361f1b3a8b2d2d5df0f13be73075dc4c4ba712c3e558aea132f118d2fafec29fe093710c2faa7d9cc943f759d3b5ed1cc1d1aee02bdbc5fe33b7c49c252b19109f37801f795b032669afdcb0b24443275f3f0adfc7c68f3fe587e61fb35098a8a5b1aa9b6312ed3eb7df7e6b53f6241b9a53ea48170c6cdac5d9925a1b14c08b2bc0592c0ff6ed50930fa2d81dbe45fda8a3a0dc27917c04dedd5798bfac16dbbe5f2f3697ce7312f2fa66b1b5d25f4d293175a45e2f609ce44a99bc8150f47c4237dfe5237139177cf2b3c502a05fd89f4961265409beb825385c113c3366e1474bca2ac7e53ae7499577c2bd37c6cc4c9b946f6640d68868079c59af4e9ffd03abede2f09ace017691863c6010e3c77dcde0b68e6e6df2957fdd89e129e77e22ca521592b8fa240f48afb737385556b7fcd4857a4c3f7cd37966336e8ccdb0c166ded4362da35b15fa2a66a3bbfcfcd4e2fc626582228289b1f485caf19a51c9489f758ceb6d1b2642f8beddfa2660390ac0474c1f525b62e03ace7947a3e83dd6a31236d82186a73174a2a92117e11e03853638a250aec1b136ac03169c0c06e85e29df3611ec17b6d230d1730b1b5d1c36862aa0532859f96bfdf4377c52633a72ddbb052a1d8c33b6154e8ba167e47c651b1a23f50c4f91b834eb2f371ab68a8777f6177a15e901c61efe1eb066ca129aa3d9516d86ff7de836805b19fcf3df5aa7af59467d1fb904698e8525b701cd4a4862e97a7974ebb30e3f2baf6060fbe12d5aecb46925fb703a64a9146a7f97cbfce423f9f917746018f888d95751fd037b35352b481bcb8c5063f6262ca706b5a500e242ece22240dbc831ed68c72a94bdc822c8d5e3f88761fb53ad1b802231cce19ed6dda29c98392a13eb360ce0428fd80eea1e296ca59d349e215bce54391b897e5fbf46e4378a12687dc79a963aeb1b1181a07364873af55124a1b2bf0f253242af6af6e39e1872ad30abf0095a4d571f756f0913a7bcc88d5be7c628e44931305dc9c43a169039505cdf729b720533a0e9c4965f118f4afee590ab22271deddc2de&access_code=AVAZ78FF42AH48ZAHA");
           // res.redirect("https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction&merchant_id=176047&encRequest=7401b4b234bb932be57048b0a36c9f47c1ea1c206d250eb64361f1b3a8b2d2d5df0f13be73075dc4c4ba712c3e558aea132f118d2fafec29fe093710c2faa7d9cc943f759d3b5ed1cc1d1aee02bdbc5fe33b7c49c252b19109f37801f795b032669afdcb0b24443275f3f0adfc7c68f3fe587e61fb35098a8a5b1aa9b6312ed3eb7df7e6b53f6241b9a53ea48170c6cdac5d9925a1b14c08b2bc0592c0ff6ed50930fa2d81dbe45fda8a3a0dc27917c04dedd5798bfac16dbbe5f2f3697ce7312f2fa66b1b5d25f4d293175a45e2f609ce44a99bc8150f47c4237dfe5237139177cf2b3c502a05fd89f4961265409beb825385c113c3366e1474bca2ac7e53ae7499577c2bd37c6cc4c9b946f6640d68868079c59af4e9ffd03abede2f09ace017691863c6010e3c77dcde0b68e6e6df2957fdd89e129e77e22ca521592b8fa240f48afb737385556b7fcd4857a4c3f7cd37966336e8ccdb0c166ded4362da35b15fa2a66a3bbfcfcd4e2fc626582228289b1f485caf19a51c9489f758ceb6d1b2642f8beddfa2660390ac0474c1f525b62e03ace7947a3e83dd6a31236d82186a73174a2a92117e11e03853638a250aec1b136ac03169c0c06e85e29df3611ec17b6d230d1730b1b5d1c36862aa0532859f96bfdf4377c52633a72ddbb052a1d8c33b6154e8ba167e47c651b1a23f50c4f91b834eb2f371ab68a8777f6177a15e901c61efe1eb066ca129aa3d9516d86ff7de836805b19fcf3df5aa7af59467d1fb904698e8525b701cd4a4862e97a7974ebb30e3f2baf6060fbe12d5aecb46925fb703a64a9146a7f97cbfce423f9f917746018f888d95751fd037b35352b481bcb8c5063f6262ca706b5a500e242ece22240dbc831ed68c72a94bdc822c8d5e3f88761fb53ad1b802231cce19ed6dda29c98392a13eb360ce0428fd80eea1e296ca59d349e215bce54391b897e5fbf46e4378a12687dc79a963aeb1b1181a07364873af55124a1b2bf0f253242af6af6e39e1872ad30abf0095a4d571f756f0913a7bcc88d5be7c628e44931305dc9c43a169039505cdf729b720533a0e9c4965f118f4afee590ab22271deddc2de&access_code=AVAZ78FF42AH48ZAHA");
        } catch(e) {
            console.log("exception is " + e);
        }
        },
    paymentResponse: async (req, res) => {
        console.log("payment response received " + JSON.stringify(req.body, null, 2));
        var result = await paymentService.getResponse(req.body.encResp);
        res.render("transaction-receipt", {url: config.get('server_url'), transaction: result.response.tracking_id, bank_ref_no: result.response.bank_ref_no, order_id: result.response.order_id});
        console.log("response in controller " + JSON.stringify(result, null, 2));

    },
    test: async (req, res) => {
       // res.render('verification', {url: "http://localhost:3002"});
        res.render('verification', {url: config.get('server_url')});
       // res.send("hello");
    }
}