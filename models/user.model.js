const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    name: String,
    age: Number,
    phone: String,
    address:String,
    email: String,
    password: String,
    role:String
});

const User = mongoose.model('User', productSchema, 'users');

module.exports = User;