const mongoose = require('./db');

let users = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    userName: {
        type: String,
        unique: true,
    },
    password: {
        type: String
    },
    friends : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users'
    }],
    chatBox : Array,
    groups : Array,
    online : Boolean,
    lastSeen : Date,

});

users.index({userName : 1});

module.exports = mongoose.model('users', users);