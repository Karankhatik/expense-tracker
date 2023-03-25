const mongoose = require('mongoose');

//database link
mongoose.connect('mongodb://127.0.0.1:27017/expense-tracker');
//connection established
const db = mongoose.connection;
//if Error send the error 
db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;