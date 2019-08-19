const mongoose = require('./db');

let messages = new mongoose.Schema({
    users : Array,
    message : Array
},{
  timestamps: true,
});

module.exports = mongoose.model('messages', messages);