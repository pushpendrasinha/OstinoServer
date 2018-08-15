var mongoose = require('mongoose');
var schema = mongoose.Schema({
    customer_id: { type: String, required: true },
    order_id: { type: String, required: true },
    ordered_on: { type: String, required: true },
    order_status: { type: String, required: true },
    payment_done: { type: Boolean, required: true },
    order_items: { type: Array, required: true },
    order_total: { type: String, required: true },
    order_delivered_on: { type: Date, required: false },
    order_delivered_to: { type: JSON, required: true },
},{collection: 'orders', versionKey: false});

module.exports = mongoose.model('order',schema);