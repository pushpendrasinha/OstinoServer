var cartService = require("../services/cart");

module.exports = {
    addProduct: async (req, res) => {
        var userId = req.userId;
        var result = await cartService.addProduct(userId, req.body.productId);
        res.status(200).send(result);
    },

    removeProduct: async (req, res) => {
        var userId = req.userId;
        var result = await cartService.removeProduct(userId, req.body.productId)
        res.status(200).send(result);
    },

    viewCart: async (req, res) => {
        var userId = req.userId;
        var result = await cartService.getCartItems(userId);
        res.status(200).send(result);
    },

    updateCart: async (req, res) => {
        var userId = req.userId;
        var productId = req.body.productId;
        var quantity = req.body.quantity;
        var result = await cartService.updateCart(userId, productId, quantity);
        res.status(200).send(result);
    }
}