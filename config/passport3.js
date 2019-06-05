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

passport2: We want to add validation.  This must be done inside the callback function.  Since we get the request passed to the callback
because we set passReqToCallback to true, we can access all the parameters of the callback.  We will do this before checking of the email
already exists and the other stuff.  We will run req.checkBody method, a function added by the validator.  We want to check the email field
(paramater email.) and we want to send back the message "email failed" (second parameter).  Then we will chain the validators we want to use
such as isEmail() as well ais notEmpty().  Do this for the password input as well (copy and paste and change necessary things).
This currently doesn't do anything since all it does is check if there are any errors.  We need to display these errors.  In order to do this,
we will make a variable called errors where we will check if any validation errors appear.  We do this with req.valdiationErrors(), the
validationErrors() function is given by validator.  With these errors extracted, we will create an if statement in which we check to see if we 
have errors and if so, loop through with .forEach and .push them onto an array that we also make in the if statement. We don't want to push the
error but the message.  This is done with the .msg field? (watch video 8) given by validator package.  Each error has a parent field
(type of error) and message field (other fields as well but we don't care about them).  Then return done(), null because there is no 
technical error, false because it was not successful, and then error messages through req.flash() method and assigning the error field
with 'error' and then messages variable which was array created in if statement.

passport3: video 9.  Pretty much copied "sign up" config and modified some elements for "sign in" config.  We don't really need to validate,
but we will give some error messages anyway.  Use validPassword method that was defined in user model (/model/user). If everything works,
return null with user (null, user) (delete new user creation from local.signup if copied and pasted everything).  
Create routes for sign in in index#.js file.
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
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty().isLength({min:4});
    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
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

passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},  function (req, email, password, done) {
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    User.findOne({'email': email}, function(err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, {message: 'No user found'});
        }
        if (!user.validPassword(password)) {
            return done(null, false, {message: 'Wrong password'});
        }
        return done(null, user);
    });
}

));