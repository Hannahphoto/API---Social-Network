const {connect, connection, default: mongoose} = require('mongoose');

//wrap mongoose around local connection to MondoDB 
mongoose.connect('mongodb://localhost:27017/');

//export connection
module.exports = mongoose.connection;