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
*/

var express = require('express');
var router = express.Router();
var Product = require('../models/product');

/* GET home page. */
router.get('/', function(req, res, next) {
    Product.find(function (err, docs){
        var products = docs;
        res.render('shop/index5', { title: 'Express', productss: products });
        console.log(products);
    });    
    
    
});

module.exports = router;
