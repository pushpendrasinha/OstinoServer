var mongoose = require('mongoose');
var schema = mongoose.Schema({
    email: { type: String, required: true },
    SubscribedOn: { type: Date, required: false, default: Date.now}

}, {collection: 'Subscription', versionKey: false});

module.exports = mongoose.model('subscription',schema);