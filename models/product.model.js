const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    code: String, // String is shorthand for {type: String}
    name: String,
    quantity: Number,
    price: Number,
    description:String,
    images: [String],
    status: String,
    category: {"_id":mongoose.Types.ObjectId,"categoryName":String, "status":String}
});

const Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;