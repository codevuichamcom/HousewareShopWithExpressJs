const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
    categoryName: String, // String is shorthand for {type: String}
    status: String
});

const Category = mongoose.model('Category',categorySchema,'categories');

module.exports=Category;