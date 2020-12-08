const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    name: String,
    phone: String,
    address:String,
    note:String,
    cart:[],
    userId:mongoose.Types.ObjectId,
    createdDate:Date
});

const Order = mongoose.model('Order', orderSchema, 'orders');

module.exports = Order;