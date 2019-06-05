/*order: copied and pasted product model as this is a mongoose model and then changed its components.  We will ahve a user field that will be of type
Schema.Types.ObjectId.  This is because this field will hold an id which refers to the user object created in the user model.  In that field, also set the reference
key to let mongoose know there is a reference.  Set the reference to the user model.  WIth that we are telling mongoose to store an id here, but that behind the scenes
you should be aware that this id links to the user model.  Also, cart will ahve a type of object, since we will be storing the complete cart object. (possible because
it is JSON).  We need to store the paymentId that is given to us by stripe so we can map the order to the payment id and see who paid for what.

*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema ({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    cart: {type: Object, required: true},
    address: {type: String, required: true},
    name: {type: String, required: true},
    paymendId: {type: String, required: true}

});

module.exports = mongoose.model('Order', schema);
