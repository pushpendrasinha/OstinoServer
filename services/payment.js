var config = require('../util/config-util').nodeConfig;
var mongoose = require('mongoose');
mongoose.connect(config.get('mongo:url'));
var cartModel = require("../models/cart");
var orderModel = require("../models/order");
var cartService = require("../services/cart");
var addressModel = require("../models/address");
var transactionModel = require("../models/transaction");
var userModel = require("../models/user");
var productModel = require("../models/product");
var paymentUtil = require("../util/payment");
var ccav = require("../util/ccavutil");
const qs = require('querystring');


module.exports = {
    checkout: async (userId, addressId) => {
        try {
            var address = await addressModel.findOne({_id: addressId}).select("-userId -createdAt -_id");
            if (address) {

                var cart = await cartService.getCartItems(userId);
                console.log("cart in checkout " + JSON.stringify(cart, null, 2));
                var items = cart.items.map((elem) => {
                    return {
                        productId: elem._id,
                        quantity: elem.quantity,
                        price: elem.price,
                        name: elem.name,
                        img: elem.img
                    }
                })
                var order_id = "OD" + new Date().getTime();
                var order = {
                    order_id: order_id,
                    customer_id: userId,
                    order_status: "Pending",
                    order_delivered_to: address,
                    order_total: cart.amount_payable,
                    payment_done: false,
                    ordered_on: new Date(),
                    order_items: items
                }
                await new orderModel(order).save();
                var user = await userModel.findOne({_id: userId});
                /* var formdata = `merchant_id=${config.get('paymentGateway:merchant_id')}&currency=INR&language=EN&redirect_url=http%3A%2F%2F127.0.0.1%3A3002%2Fapi%2Fpayment%2Fpaymentresponse&cancel_url: http%3A%2F%2F127.0.0.1%3A3002%2Fapi%2Fpayment%2Fpaymentresponse&amount=${cart.total}&order_id=${order_id}&integration_type: iframe_normal&customer_identifier=${userId}&delivery_name=${address.name}&delivery_address=${address.address}&delivery_city=${address.city}&delivery_state=${address.state}`*/
                var formdata = `merchant_id=${config.get('paymentGateway:merchant_id')}&currency=INR&language=EN&redirect_url=${config.get('paymentGateway:redirect_url')}&cancel_url: ${config.get('paymentGateway:cancel_url')}&amount=${cart.amount_payable}&order_id=${order_id}&customer_identifier=${userId}&delivery_name=${address.name}&delivery_address=${address.address}&delivery_city=${address.city}&delivery_state=${address.state}&billing_name=${address.name}&billing_address=${address.address}&billing_city=${address.city}&billing_state=${address.state}&billing_zip=${address.pincode}&billing_email=${user.email}&billing_country=India&billing_tel=${address.phone}`
                console.log("formdata is " + formdata);
                return {url: paymentUtil.getIframeURL(formdata)};
            }

        } catch (e) {
            console.log("err in addproduct is " + e);
            return {success: false, msg: e};
        }

    },
    getResponse: async (encResponse) => {
        try {
            console.log("encResponse in service " + encResponse);
            var ccavResponse = ccav.decrypt(encResponse, config.get("paymentGateway:workingKey"));
            console.log("response is " + JSON.stringify(ccavResponse, null, 2));
            var result = qs.parse(ccavResponse);
            if (result.order_status == 'Success') {
                await new transactionModel(result).save();
                var customer = await orderModel.findOne({order_id: result.order_id});
                var paintings = [];
                for (var i = 0; i < customer.order_items.length; i++) {
                    paintings.push(customer.order_items[i].productId);
                }
                console.log("=========================================paintings id==================== " + paintings);
                await productModel.update({_id: { $in : paintings }}, { availability: false }, {multi: true});
                await cartModel.deleteOne({userId: customer.customer_id});
                var order = {
                    ordered_on: result.trans_date,
                    payment_done: true,
                }

                await orderModel.updateOne({order_id: result.order_id}, order);
                return {success: true, response: result}
            } else {
                console.log("order status is " + result.order_status);
                return {success: false, response: result}
            }
        } catch (e) {
            console.log("err in getResponse is " + e);
            return e;
        }


    }


}