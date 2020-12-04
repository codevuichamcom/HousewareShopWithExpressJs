const ObjectId = require('mongodb').ObjectId
const CATEGORY = require('../constants/category.constant');


const Product = require('../models/product.model');

module.exports.index = async (req, res) => {
    const products = await Product.find();//12 product random
    const measurements = await Product.find({"category._id": ObjectId(CATEGORY.MEASUREMENTS)}); //12 product has category HAND_TOOLS
    console.log(measurements);
    res.render("client/home", {
        products: products,
        measurements:measurements
    });
};
