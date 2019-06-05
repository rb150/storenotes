/*
product-seeder: import product models (blueprint, i think this is the actual model) by using require(). (don't need .js when requiring)
Create new product following blueprint from models/product file.

*/

var Product = require('../models/product')

var product = new Product({
    imagePath: "https://en.wikipedia.org/wiki/Halo_5:_Guardians#/media/File:Halo_Guardians.png",
    title: "Halo",
    description: "it is a game",
    price: 10
});