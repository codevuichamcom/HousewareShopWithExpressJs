const ObjectId = require('mongodb').ObjectId
const CATEGORY = require('../constants/category.constant');


const Product = require('../models/product.model');
const Category = require('../models/category.model');

module.exports.home = async (req, res) => {
    const products = await Product.find().limit(8);//12 product random
    const measurements = await Product.find({"category._id": ObjectId(CATEGORY.MEASUREMENTS)}).limit(8); //8 product has category HAND_TOOLS
    const arrivals = await Product.find().sort({"createdDate":-1}).limit(4);
    const tools = await Product.find({"category._id": ObjectId(CATEGORY.TOOLS)});
    const homeAndGardens = await Product.find({"category._id": ObjectId(CATEGORY.HOME_AND_GARDEN)});

    const categories = await Category.find();
    res.render("client/home", {
        products: products,
        measurements:measurements,
        arrivals:arrivals,
        tools:tools,
        homeAndGardens:homeAndGardens,

        categories:categories
    });
};
module.exports.detail = async (req, res) => {
    const {id}=req.query;
    const product = await Product.findOne({"_id":ObjectId(id)});

    const categories = await Category.find();
    res.render("client/detail",{
        product:product,

        categories:categories
    });
};
module.exports.products = async (req, res) => {
    let pageIndex = req.query.page||1;
    const PAGE_SIZE = 8;

    let filterExpress =req.query
    if(filterExpress.page) delete filterExpress['page'];

    const products = await Product.find(filterExpress).skip((pageIndex-1)*PAGE_SIZE).limit(PAGE_SIZE);
    const categories = await Category.find();
    res.render("client/product",{
        products:products,
        categories:categories
    });
};



