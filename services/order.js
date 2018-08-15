var orderModel = require("../models/order");
var cartService = require("../services/cart");

module.exports = {
    myOrders: async (userId) => {
        try {
            var orders = await orderModel.find({customer_id: userId, payment_done: true});
            console.log("orders in myorders " + JSON.stringify(orders,null,2));
            return {success: true, orders: orders};
        } catch(e) {
            return {success: false, orders: null, error: e};
        }

    }


}