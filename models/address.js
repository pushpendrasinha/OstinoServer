var mongoose = require('mongoose');
var schema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    pincode: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    addressType: { type: String, required: true },
    locality: { type: String, required: true },
    landmark: { type: String, required: false },
    altContact: { type: String, required: false },
    createdAt: { type: Date, required: false, default: Date.now }
}, {collection: 'Address', versionKey: false});

module.exports = mongoose.model('address',schema);