/*passport: imported necessary packages.  First configuration is serializeUser which tells passport how to store the user in the session.
serializeUser takes in a function as a paramater; said function takes user as input and the done callback which passport will execute when its done.
Must also deseralizeUser.  Pass a function as argument with id of user that is serialized and done as parameters.  Using mongoose's User.findById with
user's id.  Pass callback where you either return the error or the user.  In done method, first argument is the error case (hence the 'null' in the 
serializeUser function.  These methods allow passport to store the user in the session and retreive the user
whenever its needed through the stored id.  Another explanation: https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
Youtube timestap: https://youtu.be/GHNLWHGCBEc?t=325 (#7 5:25)

Must create user if doesn't exist.  Create a new middleware by using use method on passport.  In passport.use, use 'local.signup' which is the signup
strategy used when wanting to create a new user. Check documentation: https://github.com/jaredhanson/passport-local
Youtube timestamp: https://youtu.be/GHNLWHGCBEc?t=481 (#7 8:01)
Set passReqToCallback to true so that it can be used in following callback function
In newUser.password method, the password should be encrypted.  This must be done in user.js in models folder.

passport1: Replace password with method created in user model (newUser.encryptPassword(password)).  Save new user and provide callback that
returns error, but otherwise will return done with null and new user (done(null, newUser)).  We can now create the new user.
In order to apply this strategy, go to index#.js file.  In the router.post, instead of redirecting to the root(/) router,
replace the callback function with passport method.
*/


var passport = require('passport');
var User =  require('../models/user1');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {
    User.findOne({'email': email}, function(err, user) {
        if (err) {
            return done(err);
        }
        if (user) {
            return done(null, false, {message: 'Email is already in use.'});
        }
        var newUser = new User();
            newUser.email = email;
            newUser.password = newUser.encryptPassword(password);
            newUser.save(function(err, result) {
                if (err) {
                    return done(err);
                }
                return done(null, newUser);
            });
    });
}));