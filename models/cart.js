var mongoose = require('mongoose');
var schema = mongoose.Schema({
    userId: { type: String, required: true },
    cartItems: { type: Array, required: true, default: [] },
    createdAt: { type: Date, required: false, default: Date.now },
    updatedAt: { type: Date, required: false, default: Date.now },

}, {collection: 'Cart', versionKey: false});

schema.pre('save', function(next) {
    this.updatedAt = Date.now();
    return next();
});
module.exports = mongoose.model('cart',schema);