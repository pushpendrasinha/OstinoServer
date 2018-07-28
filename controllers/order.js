var orderService = require("../services/order");
module.exports = {
    myOrders: async (req, res) => {
        var userId = req.userId;
        var orders = orderService.myOrders();
        res.status(200).send({success: true, orders: orders});
    }
}


