var mongoUtil = require("../util/mongo-util");
var productModel = require("../models/product");
// var secret = "med%ostino?R";

module.exports = {
    getProductList: async () => {
      //var list = await mongoUtil.findRecord(collection, {});
        var list = await productModel.find({});
        return list;
    },
    getProductInfo: async (productId) => {
        var info = await mongoUtil.findRecord(collection, {_id: productId});
        return list;
    },

}