var config = require('../util/config-util').nodeConfig;
var mongoose = require('mongoose');
mongoose.connect(config.get('mongo:url'));
var cartModel = require("../models/cart");
var orderModel = require("../models/order");
var cartService = require("../services/cart");
var addressModel = require("../models/address");
var transactionModel = require("../models/transaction");
var paymentUtil = require("../util/payment");
var ccav = require("../util/ccavutil");
const qs = require('querystring');


module.exports = {
    checkout: async (userId, addressId) => {
        try {
            var address = await addressModel.findOne({_id: addressId}).select("-userId -createdAt -_id");
            if(address) {

            var cart = await cartService.getCartItems(userId);
            console.log("cart in checkout " + JSON.stringify(cart, null, 2));
          var items =   cart.items.map((elem)=> {
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
                order_total: cart.total,
                payment_done: false,
                ordered_on: new Date(),
                order_items: items
            }
            await new orderModel(order).save();
            var formdata = `merchant_id=${config.get('paymentGateway:merchant_id')}&currency=INR&language=EN&redirect_url=http%3A%2F%2F127.0.0.1%3A3002%2Fapi%2Fpayment%2Fpaymentresponse&cancel_url: http%3A%2F%2F127.0.0.1%3A3002%2Fapi%2Fpayment%2Fpaymentresponse&amount=${cart.total}&order_id=${order_id}&integration_type: iframe_normal&customer_identifier=${userId}&delivery_name=${address.name}&delivery_address=${address.address}&delivery_city=${address.city}&delivery_state=${address.state}`
                console.log("formdata is " + formdata);
           return { url: paymentUtil.getIframeURL(formdata) };
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
            await new transactionModel(result).save();
         /*  var order =  await orderModel.findOne({order_id: result.order_id});
           order.ordered_on = new Date();
           order.payment_done = true;*/
         var order = {
             ordered_on: result.trans_date,
             payment_done: true
         }
        /// console.log("orderid is " + result.order_id);
       //  var odr = await orderModel.findOne({order_id: result.order_id});
        // console.log("odr is " + JSON.stringify(odr, null, 2));
            await orderModel.updateOne({ order_id: result.order_id }, order);
         // await order.save();
           return ccavResponse;
        } catch(e) {
            console.log("err in getResponse is " + e);
            return e;
        }


    }



}