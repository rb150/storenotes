/*
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
Add profile route to get (router.get) redirected to profile if successful (make something in profile.hbs)

*/

var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var Product = require('../models/product');

var csrfProtection = csrf();
router.use(csrfProtection);

/* GET home page. */
router.get('/', function(req, res, next) {
    Product.find(function (err, docs){
        var products = docs;
        res.render('shop/index5', { title: 'Express', productss: products });
        console.log(products);
    });    
    
    
});

router.get('/user/signup', function(req, res, next) {
    res.render('user/signup2', {csrfToken: req.csrfToken()});
});

router.post('/user/signup', passport.authenticate('local.signup', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup2',
    failureFlash: true
}));

router.get('/user/profile', function(req, res, next) {
    res.render('user/profile');
});

module.exports = router;
