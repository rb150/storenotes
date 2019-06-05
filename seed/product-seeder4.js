/*
product-seeder: import product models (blueprint, i think this is the actual model) by using require(). (don't need .js when requiring)
Create new product following blueprint from models/product file.

product-seeder1: product-seeder only creates one product.  For multiple products, an array is used. Each 
element of the array is a new object that is being created. (there are other ways to do this)

product-seeder2: need to save products to database.  This is done by looping through array and using the save() method.
save() method with mongoose allows one to save model to the database.  Mongoose will create a new collection, and will save this
document into that collection. (like in mysql you have database tables and entries, here you have collections and documents).
save() method will create a new document based upon data we work with.

product-seeder3: need to connect to mongoose inside file in order to save to database.  This is done by importing mongoose
and connecting to mongoose then running the save() method and then disconnecting as we dont need to be connected
(app#.js is connected to the server, however we are running this as a one time app (through terminal) to save data to the database,
so this must be connected and this disconnected seperately as it is not part of that runtime eveironment)

product-seeder4: product-seeder3 will not work since node.js is asynchronus.  As such, mongoose will disconnect while it is going through
the for loop.  One cannot just put the disconnect() method in the callback for the save() method (products[i]save(fucntion(blah blah))) because
then it will disconnect after every entry.  Problem is solved by creating helper variable and checking if that variable is equal to products.length.
Once equivelance exists, call a function (exit()), that is defined globally. (as of 4, correct links also provided)
*/

var Product = require('../models/product')

var mongoose = require('mongoose');

mongoose.connect('localhost:27017/shopping')

var products = [
    new Product({     
        imagePath: "https://upload.wikimedia.org/wikipedia/en/6/68/Halo_Guardians.png",
        title: "Halo 5",
        description: "it is a game",
        price: 10
    }),
    new Product({     
        imagePath: "https://upload.wikimedia.org/wikipedia/en/9/92/Halo_4_box_artwork.png",
        title: "Halo 4",
        description: "it is one game",
        price: 20
    }),
    new Product({     
        imagePath: "https://upload.wikimedia.org/wikipedia/en/b/b4/Halo_3_final_boxshot.JPG",
        title: "Halo 3",
        description: "it is another game",
        price: 30
    }),
    new Product({
        imagePath: "https://upload.wikimedia.org/wikipedia/en/9/92/Halo2-cover.png", 
        title: "Halo 2",
        description: "it is one of several games",
        price: 40
    }),
    new Product({
        imagePath: "https://upload.wikimedia.org/wikipedia/en/8/80/Halo_-_Combat_Evolved_%28XBox_version_-_box_art%29.jpg",
        title: "Halo",
        description: "it is a single game",
        price: 50
    }),
    new Product({
        imagePath: "https://upload.wikimedia.org/wikipedia/en/6/6d/Halo-spartan-assault-boxart.png",
        title: "Halo: Spartan Assault",
        description: "it is a game",
        price: 60
    }),
];

var done = 0;
for (var i=0; i<products.length; i++) {
    products[i].save(function (err, result){
        done++; //increment first since products.legnth doesnt start at 0
        if (done === products.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}
