/*
user: model for user info.  Require mongose and schema; create variable userSchema; and export schema 
(as in products model).  We also want to add methods that hash the password when it is being stored,
as well as a method to validate this hash password.  This will be needed when signing in/up the user.


*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema ({
    email: {type: String, required: true},
    password: {type: String, required: true}

});

module.exports = mongoose.model('User', userSchema);