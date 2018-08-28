var mongoose = require('mongoose');
var schema = mongoose.Schema({
    userId: { type: String, required: true },
    hash: { type: String, required: true },
    createdAt: { type: Date, required: false, default: Date.now}

}, {collection: 'Verification', versionKey: false});

module.exports = mongoose.model('verification',schema);