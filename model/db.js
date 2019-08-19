const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/messanger')
mongoose.connection.on('error', (err) => {
    throw err;
})

module.exports = mongoose;