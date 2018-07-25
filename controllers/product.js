var productService = require("../services/product");

module.exports = {
    getProductsList: async (req, res) => {
    var result = await productService.getProductList();
    res.status(200).send(result);
    },

    getProductInfo: async (req, res) => {
        var result = await productService.getProductInfo(req.productId);
        res.status(200).send(result);
    }
}