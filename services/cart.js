var config = require('../util/config-util');
var mongoose = require('mongoose');
mongoose.connect(config.nodeConfig.get('mongo:url'));
var cartModel = require("../models/cart");
var productModel = require("../models/product");


module.exports = {
    addProduct: async (userId, productId) => {
        try {
            var userCart = await cartModel.findOne({userId: userId});
            console.log("usercart is " + userCart);
            var totalItems = 0;
            if(userCart) {
                userCart.cartItems.push({productId: productId, quantity: 1});
                totalItems = userCart.cartItems.length;
                await userCart.save();
            } else {
                var obj = {
                    userId: userId,
                    cartItems: [{productId: productId, quantity: 1}]
                }
                totalItems = 1;
                await new cartModel(obj).save();
            }
           return {success: true, msg: "product added successfully", totalItems: totalItems};
        } catch (e) {
            console.log("err in addproduct is " + e);
            return {success: false, msg: e};
        }

    },
    removeProduct: async (userId, productId) => {
        try {
            var cart = await cartModel.findOne({userId: userId});
            if (cart) {
               cart.cartItems =  cart.cartItems.filter((element) => {
                    return element.productId != productId
                })
                await cart.save();
             var result =   await module.exports.getCartItems(userId);
             return {success: true,  data: result}
               /* var totalItems = cart.cartItems.length;
                var total = 0;
                cart.cartItems.forEach((item) => {
                    total = total + item.price;
                })
                return {success: true,  items: cart.cartItems, total: total, totalItems: totalItems}*/
                }
        } catch(e) {
            return {success: false,  msg: e}
        }


    },
    getCartItems: async (userId) => {
        try {
            console.log("userId in getCartItems is " + userId);
            var cart = await cartModel.findOne({userId: userId});
           // console.log("cart in getCartItems is " + JSON.stringify(cart, null, 2));
            if(cart) {
             var docs = await module.exports.getCartProducts(cart.cartItems);
             var total = module.exports.billTotal(docs);
                console.log("getcartitems total" + total);
                return {success: true,  items: docs, total: total, totalItems: docs.length}
                //console.log("cartitems " + JSON.stringify(cartItems, null, 2));
                } else {
                return {success: true, total: 0, totalItems: 0}
            }

        } catch (e) {
            console.log("err is " + e);
            return {success: false, msg: e};
        }

    },
    updateCart: async (userId, productId, quantity) => {
        try {
            var userCart = await cartModel.findOne({userId: userId})
            console.log("usercart is " + userCart);
            userCart.cartItems.forEach((item) => {
             if(item.productId == productId) {
                 item.quantity = quantity;
             }
         })
          console.log("cartItems before save " + JSON.stringify(userCart, null, 2));
          // await userCart.save();
            await cartModel.updateOne({userId: userId}, userCart);
            var cartProducts = await module.exports.getCartProducts(userCart.cartItems);
           var total = module.exports.billTotal(cartProducts);
            return {success: true, items: cartProducts, totalItems: cartProducts.length, total: total};
        } catch (e) {
            console.log("err in addproduct is " + e);
            return {success: false, msg: e};
        }

    },

    billTotal: function(cart) {
        console.log("in billtotal");
        var total = 0;
        cart.forEach((cartItem)=> {
            total = total + (cartItem.price) * (cartItem.quantity);
        })
        return total;
    },

    getCartProducts: async (cartItems) => {
        /*var items = cartItems.map((value) => {
            return value.productId;
        });*/
        var items = [];
        for(var i=0; i<cartItems.length; i++) {
            items.push(cartItems[i].productId);
        }
        //console.log("productIds " + items);
        var docs = await productModel.find({_id: {$in: items}}).lean().exec();
        console.log("docs is " + docs);
        docs.forEach((elemnt) => {
            var result =  cartItems.filter((value) => {
                return value.productId == elemnt._id
            })
            elemnt.quantity = result[0].quantity;
            })
        return docs;
    }


}