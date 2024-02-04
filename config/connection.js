const {connect, connection, default: mongoose} = require('mongoose');

//wrap mongoose around local connection to MondoDB 
mongoose.connect('');

//export connection
module.exports = mongoose.connection;