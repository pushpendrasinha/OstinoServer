var mongoose = require('mongoose');
var schema = mongoose.Schema({
name: { type: String, required: true },
email: { type: String, required: true },
contact: { type: String, required: true },
password: { type: String, required: true },
    gender: {type: String, required: true},
    createdAt: { type: Date, required: false, default: Date.now }
}, {collection: 'User', versionKey: false});

module.exports = mongoose.model('user',schema);