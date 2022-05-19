const mongoose = require('mongoose');
const { model, Schema } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

const cartSchema = new Schema ({
    userId: String,
    productId: String,
    bought: Boolean,
    quantity: Number
});

cartSchema.plugin(mongoosePaginate);
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;