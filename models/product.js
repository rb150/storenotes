/*
product.js: import mongoose and create variable that uses mongoose schema object (mongoose.Schema)
    Pass javascript object that defines/describes data.  In our case, our product currently has 
    a product image, title, description and price.
        Image will be an imagePath since we will not be storing image in the database. Key is object.
        Set values {type: String, required: true}. Required makes it needed - there are no products without images (key imagePath)
        All other key values will be same (copy and paste) except price which will be type:Number
    Schema is a blueprint we will use for each new entry in database.  
    We work with models which are baed on this blueprint (*like classes and objects maybe, check documentation*)
    Must export to make this available to other files.  This is done using module.exports = mongoose.model()
    Using mongoose.model() function, pass paramater 'Product' in first parameter, which names the schema
    and then the schema on which the model is based on (schema defined by var schema above export)
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema ({
    imagePath: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
});

module.exports = mongoose.model('Product', schema);
