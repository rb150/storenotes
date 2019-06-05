/*
index1.js: in addition to title, we need to return array of products which can be looped in the handlebars view
(handlebars has looping mechanism), and then output the right data in the view.  First the products must be fetched
by requiring (importing) the product model from models folder.  Fetch the products by executing Product.find()
(var products = Product.find();).  Pass this data to the view after title.  Will use productss with two s's to 
diffrentiate between var products here and keyed output for view rendering.


*/

var express = require('express');
var router = express.Router();
var Product = require('../models/product');

/* GET home page. */
router.get('/', function(req, res, next) {
    var products = Product.find();    
    res.render('shop/index4', { title: 'Express', productss: products });
    console.log(products);
});

module.exports = router;
