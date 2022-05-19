const mongoose = require('mongoose');
const { model, Schema } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = new Schema({
    sku: String,
    price: Number,
    name: String,
    description: String,
    image: String,
    shipmentDeliveryTime: Number,
    active: Boolean,
    size: String,
    quantity: Number
})

productSchema.plugin(mongoosePaginate);

const Product = mongoose.model('Product', productSchema);

module.exports = Product