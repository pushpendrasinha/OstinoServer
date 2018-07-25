var mongoose = require('mongoose');
var schema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, required: false, default: Date.now }
}, {collection: 'Feedback', versionKey: false});

module.exports = mongoose.model('feedback',schema);