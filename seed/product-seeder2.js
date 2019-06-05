/*
product-seeder: import product models (blueprint, i think this is the actual model) by using require(). (don't need .js when requiring)
Create new product following blueprint from models/product file.

product-seeder1: product-seeder only creates one product.  For multiple products, an array is used. Each 
element of the array is a new object that is being created. (there are other ways to do this)

product-seeder2: need to save products to database.  This is done by looping through array and using the save() method.
save() method with mongoose allows one to save model to the database.  Mongoose will create a new collection, and will save this
document into that collection. (like in mysql you have database tables and entries, here you have collections and documents)
*/

var Product = require('../models/product')

var products = [
    new Product({     
        imagePath: "https://en.wikipedia.org/wiki/Halo_5:_Guardians#/media/File:Halo_Guardians.png",
        title: "Halo",
        description: "it is a game",
        price: 10
    }),
    new Product({     
        imagePath: "https://en.wikipedia.org/wiki/Halo_4#/media/File:Halo_4_box_artwork.png",
        title: "Halo",
        description: "it is one game",
        price: 20
    }),
    new Product({     
        imagePath: "https://en.wikipedia.org/wiki/Halo_3#/media/File:Halo_3_final_boxshot.JPG",
        title: "Halo",
        description: "it is another game",
        price: 30
    }),
    new Product({
        imagePath: "https://en.wikipedia.org/wiki/Halo_2#/media/File:Halo2-cover.png", 
        title: "Halo",
        description: "it is one of several games",
        price: 40
    }),
    new Product({
        imagePath: "https://en.wikipedia.org/wiki/Halo:_Combat_Evolved#/media/File:Halo_-_Combat_Evolved_(XBox_version_-_box_art).jpg",
        title: "Halo",
        description: "it is a single game",
        price: 50
    }),
    new Product({
        imagePath: "https://en.wikipedia.org/wiki/Halo:_Spartan_Assault#/media/File:Halo-spartan-assault-boxart.png", 
        title: "Halo",
        description: "it is a game",
        price: 60
    }),
];

for (var i=0; i<products.length; i++) {
    products[i].save();
}