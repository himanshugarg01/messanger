const mongoose = require('./db');

let messages = new mongoose.Schema({
    users : Array,
    message : Array
});

module.exports = mongoose.model('messages', messages);