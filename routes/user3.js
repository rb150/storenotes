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

User2: Video 18. Change the successful redirect in the signin post route.  This is if we force login from the checkout, we want to send the user back to
the checkout page after they log in.  We will delete the success redirect, and add a third parameter to the passport.authenticate in the signin post route
function.  This will be a normal middleware function which will be executed whenever the passport middleware is passed successfully (this will not be 
reached if we have a failure redirect, but if successful we will get the middleware function).  In this function, check to see if we stored an old url
in the session with an if function whose paramater is req.session.oldUrl (if false will go to "else").  If true, redirect to the old url, if not redirect
the user to their profile page which was the original path that was there originally (user1).  Then do this same set up for the post method in the signup.
We do this in case our user hasn't signed up yet and so when we post this data for a new user, we can still send them to the checkout.

User3: Same video 18 (guy changed his shit).  The old method of setting the req.session.oldUrl to null is not a good idea since once the redirect gets
executed, the req.session.oldUrl wont be as accessible as before.  Therefore, we store the oldUrl in a variable (oldUrl), and then set the
req.session.oldUrl to null. In this way we are always able to retrieve the old url, then clear it, and then redirect.
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
    failureRedirect: '/user/signup',
    failureFlash: true
}), function (req, res, next) {
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/user/profile');
    }

});


router.get('/signin', function(req, res, next) {
    var messages = req.flash('error');
    res.render('user/signin1', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/signin', passport.authenticate('local.signin', {
    failureRedirect: '/user/signin',
    failureFlash: true
}), function (req, res, next) {
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/user/profile');
    }

}
);




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