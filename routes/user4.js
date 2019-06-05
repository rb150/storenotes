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

user4: Video 19.  We want to add the shopping cart list to the users profile page if they have not checked out yet.  We do this by using mongoose's find method.
First, however, we must import our "order" model.  We then use the find method on this order model.  We don't want to find all orders though, just the orders for
the logged in user.  We want to add this to the get route for the /profile page.  We also want to add this after the isLoggedIn function since we want to
make sure the user is logged in beacuse we will be using the logged in users passport request to compare it with the user in the mongoose database 
(mongoose figures out how to do it on its own).  Set up the usual callback with error or relevant error.  Set some kind of error return. We want to get the
cart from that order.  Create a new variable cart.  We then want to do something to each of these orders.  We set a forEach loop and a function (to do
the something) for each order.  We want to create a new cart as we did in the index route file everytime the function is called.  We want to do this because
we will need access to the generateArray method in our cart model.  We need this method to give us an array of items which we will then need in our user
profile, where we want to output our order data (price and items exactly as in cart).  We need the cart methods in the cart model basically.  Create a 
new Cart object and assign it to the newly created cart variable. Pass the parameter of order.cart because we are storing this cart on each order in the
database.  Set order.items (a new field that is added) to conveniently access all our itmes and set it equal to the cart.generateArray() that we get from
the Cart model (make sure to import cart model).  Next add this array of items to the user profile in the views by passing it through as the second parameter
in the render method on the response object ({orders: orders}).
*/

var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var Order = require('../models/order');
var Cart = require('../models/cart3');

var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/profile', isLoggedIn, function(req, res, next) {
    Order.find({user: req.user}, function(err, orders){
        if (err) {
            return res.write('Error!');
        }
        var cart;
        orders.forEach(function(order){
            cart = new Cart(order.cart);
            order.items = cart.generateArray();
        });
        res.render('user/profile', {orders: orders});
    });
    
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