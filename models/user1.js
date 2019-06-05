/*
user: model for user info.  Require mongose and schema; create variable userSchema; and export schema 
(as in products model).  We also want to add methods that hash the password when it is being stored,
as well as a method to validate this hash password.  This will be needed when signing in/up the user.

user1: Add helper methods to encrypt newUser.password. bcrypt is imported so that the password in passport.js can be encrypted.
Add methods to userSchema using methods object (userSchema.methods) and name it whatever (in this case encryptPassword)
This will equal a function where we expect to get a password.  Inside function, return hashed password using bcrypt, then the
synchronous hashing where we pass the password into.  On that, we will generate the salt using 5 rounds of salt creation.
This creates an encrypted password method to get password and return encrypted password (i think). 
Set up another method to check hashed password (validPassword).  This uses compareSync() method to see if the password matches
this.password.  this.password refers to the password of the current user
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema ({
    email: {type: String, required: true},
    password: {type: String, required: true}

});

userSchema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);