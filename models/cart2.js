/*Note: this is farily complicated, might want to rewatch video.

cart: video 12: create a cart model constructor and export it to the rest of the code by setting it to module.exports in one line.  We want to know the items in the cart
(this will be an array which we will leave empty for now),the total quantity of items in the cart, as well as the total price.  In order to do this we create the variables
in the constructor (make sure to use 'this' and semicolons since these aren't properties but actual variables that will have set values).  
We also need to create an add function to add items to our cart.  Since we want to be able to group the same items together, we need to have the id parameter that we had made
earlier (this is the reason for the id).  We don't want to just push items on an array cuz that would make a huge list of the same items if they exist.  We do this by
creating a new cart everytime we add an item to the cart.  We will check the old cart and see if a new item as been added and if it is the same item, we will simply add
that item to the list instead of pushing a new array and creating a new cart.

cart1: video 12: Wre calling this.items[] in our add function.  this.items is an empty array so we need to change it.  Since we always want to recreate our cart, this.items
should be an object; more specifically, it should be our old carts' items.  Therefore, we change the array to a variable (that should be the old cart object) which we call
initItems.  We also pass this to our Cart constructor as a parameter.  In this way, whenever we recreate our cart, we pass our old cart into it within which we can check
to see if what the items are.  Now that this.items exists, we can add to our "add" function.  First we will check to see if said item is in our cart, (via the id which will
be given in the html?).  If stored item doesnt exist, we will create a new one.  storedItem we will set equal to items[id], but both will be assigned to a new object
which will have the new item (the one in the paramater).  Quantity and price should be 0 since we will be modifying it in later steps.
With that, we are creating a new object, we are giving it a key to be the product id, and we are also assigning it to storedItem varialbe (in one step).  After we 
have a storedItem, we will increase the quantity and the price (if there are multiple of items).  We also need to increase the total quantity and total price.

cart2: change initItems to oldCart which will be an object that contains the old cart's properties (if it exits).  If there is no old cart, the properties will 
be whatever they are following the or statement (||).  Also change totalPrice equation in Cart function: storedItem.price will be too much, must use storedItem.item.price
(this is dumb, but since we are only adding one at a time, it works).
*/

module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function(item, id) {
        var storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = {item: item, qty: 0, price: 0};
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.item.price;
    }

    this.generateArray = function () {
        var arr = [];
        for (var id in this.items){
            arr.push(this.items[id]);
        }
        return arr;
        
    }
};