var orderService = require("../services/order");
module.exports = {
    myOrders: async (req, res) => {
        var userId = req.userId;
        var result = await orderService.myOrders(userId);
        res.status(200).send(result);
    }
}


