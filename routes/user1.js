/*user: Video 9: trasnfered all "/user" routes in index file to here for sake of grouping together.  Also transferred necessary imports and router.use csrf.
Delete all the "/user" from the routes.  Don't forget to export using module.exports = router.

user1: Video 9: Create custom middleware to see if user is logged in.  Call this middleware isLoggedIn.  The middleware will use the isAuthenticated method
that comes with passport.  If the user is authenticated, then return next(), if not redirect to home page (/).  ONce the middleware is created,
we can use it on all the routes we want to protect.  In our case it is the profile route (we reordered the route to have signin and signup at the top).
Place the middleware as the second paramater and do not use paranthesis as you are referencing the function, not executing it.  Also create logout
functionality.  We do this by creating a logout route (before profile route) and call req.logout() which is a method added by passport and redirect to
the front page.  We will also create the opposite case of isLoggedIn which is basically making sure that only unauthenticated users can reach these routes,
and we will call it notLoggedIn and basically reverse the logic.  Then we mount that middleware to our path(/) by using router.use which will use that
middleware anytime that path is used.  Order is obvioulsy important (why?) (placed on top, but below /profile route)  Routes that you want the user to be logged
in to activate must be placed in front middleware that uses notLoggedIn since everything will go through notLoggedIn if you don't (place /profile and /logout in front).
Essentially you want the notLoggedIn to be a filter for all routes you want the user to be logged in for.
*/

var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/profile', isLoggedIn, function(req, res, next) {
    res.render('user/profile');
});

router.get('/logout', isLoggedIn, function (req, res, next) {
    req.logout();
    res.redirect('/');
})


router.use('/', notLoggedIn, function(req, res, next){
    next();
});

router.get('/signup', function(req, res, next) {
    var messages = req.flash('error');
    res.render('user/signup3', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup',
    failureFlash: true
}));


router.get('/signin', function(req, res, next) {
    var messages = req.flash('error');
    res.render('user/signin', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/signin', passport.authenticate('local.signin', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signin',
    failureFlash: true
}));




module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}