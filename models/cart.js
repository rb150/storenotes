/*Note: this is farily complicated, might want to rewatch video.

cart: video 12: create a cart model constructor and export it to the rest of the code by setting it to module.exports in one line.  We want to know the items in the cart
(this will be an array which we will leave empty for now),the total quantity of items in the cart, as well as the total price.  In order to do this we create the variables
in the constructor (make sure to use 'this' and semicolons since these aren't properties but actual variables that will have set values).  
We also need to create an add function to add items to our cart.  Since we want to be able to group the same items together, we need to have the id parameter that we had made
earlier (this is the reason for the id).  We don't want to just push items on an array cuz that would make a huge list of the same items if they exist.  We do this by
creating a new cart everytime we add an item to the cart.  We will check the old cart and see if a new item as been added and if it is the same item, we will simply add
that item to the list instead of pushing a new array and creating a new cart.

*/

module.exports = function Cart() {
    this.items = [];
    this.totalQty = 0;
    this.totalPrice = 0;

    this.add = function(item, id) {
        var storedItem = this.items[id];
    }
};