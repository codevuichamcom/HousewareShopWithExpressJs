const ObjectId = require('mongodb').ObjectId
const CATEGORY = require('../constants/category.constant');


const Product = require('../models/product.model');

module.exports.home = async (req, res) => {
    const products = await Product.find().limit(8);//12 product random
    const measurements = await Product.find({"category._id": ObjectId(CATEGORY.MEASUREMENTS)}).limit(8); //8 product has category HAND_TOOLS
    const arrivals = await Product.find().sort({"createdDate":-1}).limit(4);
    const tools = await Product.find({"category._id": ObjectId(CATEGORY.TOOLS)});
    const homeAndGardens = await Product.find({"category._id": ObjectId(CATEGORY.HOME_AND_GARDEN)});
    res.render("client/home", {
        products: products,
        measurements:measurements,
        arrivals:arrivals,
        tools:tools,
        homeAndGardens:homeAndGardens
    });
};
module.exports.detail = async (req, res) => {
    const {id}=req.query;
    const product = await Product.findOne({"_id":ObjectId(id)});
    res.render("client/detail",{
        product:product
    });
};
module.exports.products = async (req, res) => {
    const products = await Product.find();
    res.render("client/product",{
        products:products
    });
};



