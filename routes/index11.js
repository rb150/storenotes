/*
****Note: middleware code should be put in a seperate file (called controller or config or w/e).  It is placed here
for tutorial purposes (vid 14)****

index1.js: in addition to title, we need to return array of products which can be looped in the handlebars view
(handlebars has looping mechanism), and then output the right data in the view.  First the products must be fetched
by requiring (importing) the product model from models folder.  Fetch the products by executing Product.find()
(var products = Product.find();).  Pass this data to the view after title.  Will use productss with two s's to 
diffrentiate between var products here and keyed output for view rendering.

index2.js: index1 will not work as is because finding products is asynchronus, therefore we are calling the render method
when we haven't gotten all the results back.  It is looping through something because products some kind of mongoose object
but it is is not the Products.find() product array (look at console.log for index1). In order to rectify this, 
create a new callback function in the find method and call the render method. Pass the docs to the productss key however
you want (in this case through a products variable so it can be console.logged) but it could be passed directly to the
products key (productss: docs)

index3: Add csrf protection by requiring csurf (assigned to var csrf).  Create variable csrfProtection that is assigned the
csrf() method.  After first route, add second route (router.get) (*why did we delete the users route?*).  In the res.render method,
return the user/signup (no / before user in render method)view as well as a javascript object that contains the csrfToken 
(in the request object) by assgning it to a key (csrfToken: req.csrfToken() (not doing productss). csurf package provides 
the functionality to add csrfToken() to our view.  Must apply csrf middleware to router with the router.use() method, 
after the variable is assigned.  
    In order to test csrfToken, create a post route which redirects to home route when "submit" button is clicked in signup#.hbs

index4: Import passport (also reorganized imports and files). In the router.post method where we create the user, instead of redirecting 
to the root/home(/) route, we will replace the request with passport.authenticate middlware that uses the parameter of local.signup (from passport#.js)
and a second parameter of a configuration or javascript object where you can tell passport to redirect in different cases (successRedirect, failureRedirect)
and also flash a message from the connect-flash package (in passport#.js).  Passport doesn't know these strategies, they must be imported in app.js.
    *Note: the ###Redirect(s) are router based.  As in, they are like router.get so they are not going to use the handlebar templates 
    Add profile route (router.get) to get redirected to profile if successful (make something in profile.hbs)

index5: Need to extract possible messages (error in this case) that we could have by using req.flash() (possible flash messages stores in my request 
in this flash package) stored under 'error' if they come from passport.  The "message" in passport#.js is stored under error.  We can retrieve this 
from the flash package and we can pass this to our view.  In order to pass this to our view, first create a messages variable that we pass in the render method
we need to put an if statement in the view to see if we have messages.  We do this by creating a variable (hasErrors) that will exist only if there are 
messages (if messages.length > 0) since handlebars can only deal with variables with singular properties (true/false)
   
index6: video 9 added get and post routes for signin.  Copy "sign up" route and modify. In post route, we don't use req,res,next function but instead 
passport authenticate with the local.signin strategy that was setup in passport3.  The redirects are identical to singup authentication (except we are using
signin view instead of signup)

index7: video10: moved all the "/user" routes to their own file (user).  Also transfered necessary imports and deleted the ones that aren't used here
(csrf, passport)

index8: video12: add a '/add-to-cart/' route with an expectation of an id (add :id to end of route).  Then, store the id in a variable (productId).  
We do this by setting that variable to req.params.id (look up difference between req.params and req.query in nodejs). Make sure that the cart model is imported.
Then, create a new cart (this will happen everytime the link is hit).  This cart's parameter (oldCart from cart model) will check to see if there is an old cart
in the session, and if there is, return it. Otherwise it will return an empty object. ((?)--> ternary conditional).  
With that, we will use mongoose to find the product by the id (Product.findByID) with productId as the first parameter and error as the second.  After error
handling, (redirect accurately later) we will use the add method on the cart that was made in the cart model and use the product that was returned in the callback
for findById, and the product.id (you could always extract product.id in the add method, but this way is more generic, and you could also use it if the product you
pass doesn't have the id itself ??).  Then we store this cart in our cart object in our session.  The express session will automatically save with each response
sent back, so we dont have to save this, it will be saved as soon as the response has been sent, so our session is safe.  Then redirect to product page.  Also, 
console.log the session cart so you can see what is going on as we haven't set up the view yet.

index9: video 13: add a '/shopping-cart/' route.  In the callback function, check to see if there is a cart in the session.  If there is not, we want to pass the
shop/shopping-cart view, but with the products object being null.  This is for looping in our 'shopping-cart' view when we check the if condition to see if there
are any products.  Once we pass the check (we have a cart), we will create a new cart of the cart stored in the session.  We will render the shopping-cart view as
before, but we will pass different paramaters: namely, we will set products to the generatedArray (method in cart model), and the carts total price (cart.totalPrice)

index10: video 14: (see note) add /checkout get route with basic callback function.  In the callback function, the first thing we want to do is to see if the cart
exists and if not, render the shopping cart page with null for products (a copy of shopping-card route; used in case someone enters /checkout in url "accidentally").
A better option would be to redirect to the shopping cart route which was done here.  If there is a shopping cart, we "create a new one" which basically copies the
shopping cart in the session.  Next, we render our checkout#.hbs view and pass a total variable that will get from our cart.

index11: video 16: make the /checkout post route for when the form gets submitted.  This can be copied from the documentation, however, first we must put the error
check that sees if we have a cart available and if not, to send an error.  Then we must also recreate the cart that is stored in the session into a cart object, just
as we did before.  Then my son, can we use stripe.  Change the default properties to the properties used in our code.  The price must be multiplied by 100 since it
uses the lowest denomination of currency in whatever currency it is using.  The source is a dummy key, we will use the token created by the stripe javascript sdk that
validated the credit card (in the checkout.js file in javascripts folder).  That token is being added to the view in the hidden field, and so it can be accessed here
on our request body.stripeToken which is the name in the input field.

*/

var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var Cart = require('../models/cart2');
var Product = require('../models/product');

/* GET home page. */
router.get('/', function(req, res, next) {
    Product.find(function (err, docs){
        var products = docs;
        res.render('shop/index6', { title: 'Express', productss: products });
        //console.log(products);
    });    
    
    
});

router.get('/add-to-cart/:id', function(req, res, next){
    
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function(err, product) {
        if (err) {
            return res.redirect('/');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/');
    });
});

router.get('/shopping-cart', function(req, res, next) {
    if (!req.session.cart) {
        return res.render('shop/shopping-cart2', {products: null});
    }
    var cart = new Cart(req.session.cart);
    res.render('shop/shopping-cart2', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});

router.get('/checkout', function(req, res, next){ 
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    res.render('shop/checkout3', {total: cart.totalPrice});
});

router.post('/checkout', function (req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }    
    var cart = new Cart(req.session.cart);
    // Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
    var stripe = require("stripe")("sk_test_VwS21wfiQbn75kJj0TRGdRUO");

    const charge = stripe.charges.create({
    amount: cart.totalPrice * 100, //in cents, must multiply by 100 to get dollars.
    currency: 'usd',
    source: 'req.body.stripeToken',
    receipt_email: 'jenny.rosen@example.com',
    
});
});

module.exports = router;
