var mongoUtil = require("../util/mongo-util");
var productModel = require("../models/product");
// var secret = "med%ostino?R";

module.exports = {
    getProductList: async () => {
      //var list = await mongoUtil.findRecord(collection, {});
        var list = await productModel.find({});
        console.log("list is " + JSON.stringify(list, null, 2));
       /*var products =  list.map(value => {
            value.price = parseInt(value.price).toFixed(2);
        })*/
       for(var i=0; i<list.length; i++) {
          // list[i].price = list[i].price.toFixed(2);
           list[i].price = Number(list[i].price).toFixed(2);
       }
        return list;
       // return products;
    },
    getProductInfo: async (productId) => {
        var info = await mongoUtil.findRecord(collection, {_id: productId});
        return list;
    },

}