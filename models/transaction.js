var mongoose = require('mongoose');
var schema = mongoose.Schema({
    order_id: { type: String, required: true },
    customer_id: { type: String, required: false },
    tracking_id: { type: String, required: true },
    bank_ref_no: { type: String, required: true },
    order_status: {type: String, required: true},
    failure_msg: { type: String, required: false },
    payment_mode: { type: String, required: true },
    card_name: { type: String, required: true },
    status_code: { type: String, required: true },
    status_message: { type: String, required: true },
    currency: { type: String, required: true },
    amount: { type: String, required: true },
    trans_date: { type: String, required: true },
    billing_name: { type: String, required: true },
    billing_address: { type: String, required: true },
    billing_city: { type: String, required: true },
    billing_state: { type: String, required: true },
    billing_tel: { type: String, required: true },
    billing_zip: {type: String, required: true},
    billing_country: {type: String, required: true},
    billing_email: {type: String, required: true},
    delivery_name: { type: String, required: true },
    delivery_address: { type: String, required: true },
    delivery_city: { type: String, required: true },
    delivery_state: { type: String, required: true },
    delivery_zip: { type: String, required: true },
    delivery_country: { type: String, required: true },
    offer_type: { type: String, required: true },
    offer_code: { type: String, required: true },
    discount_value: { type: String, required: true },
    mer_amount: { type: String, required: true },
    eci_value: { type: String, required: true },
    retry: { type: String, required: true },
    response_code: { type: String, required: true },
    billing_notes: { type: String, required: false },
    merchant_param1: { type: String, required: false },
    merchant_param2: { type: String, required: false },
    merchant_param3: { type: String, required: false },
    merchant_param4: { type: String, required: false },
    merchant_param5: { type: String, required: false },
    bin_country: { type: String, required: false },
    vault: { type: String, required: true },
}, {collection: 'Transaction', versionKey: false});

module.exports = mongoose.model('transaction',schema);