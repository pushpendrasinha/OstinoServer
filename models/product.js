var mongoose = require('mongoose');
var schema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    img: { type: String, required: true },
    availability: { type: Boolean, required: false, default: false},
}, {collection: 'products', versionKey: false});

module.exports = mongoose.model('product',schema);