const ObjectId = require('mongodb').ObjectId
const CATEGORY = require('../constants/category.constant');


const Product = require('../models/product.model');
const Category = require('../models/category.model');

module.exports.home = async (req, res) => {
    const products = await Product.find().limit(8);//12 product random
    const measurements = await Product.find({ "category._id": ObjectId(CATEGORY.MEASUREMENTS) }).limit(8); //8 product has category HAND_TOOLS
    const arrivals = await Product.find().sort({ "createdDate": -1 }).limit(4);
    const tools = await Product.find({ "category._id": ObjectId(CATEGORY.TOOLS) });
    const homeAndGardens = await Product.find({ "category._id": ObjectId(CATEGORY.HOME_AND_GARDEN) });

    req.session.url = req.url;
    res.render("client/home", {
        products: products,
        measurements: measurements,
        arrivals: arrivals,
        tools: tools,
        homeAndGardens: homeAndGardens
    });
};
module.exports.detail = async (req, res) => {
    const { id } = req.query;
    const product = await Product.findOne({ "_id": ObjectId(id) });

    req.session.url = req.url;
    res.render("client/detail", {
        product: product
    });
};
module.exports.products = async (req, res) => {
    let pageIndex = req.query.pageIndex || 1;
    pageIndex = parseInt(pageIndex);
    const PAGE_SIZE = 2;
    let totalPage = 0;

    let filterExpress = req.query

    if (filterExpress.page) delete filterExpress['page'];
    let keyword = filterExpress.inputSearch
    if (keyword) {

        let regex = new RegExp(keyword,'i');

        filterExpress = {
            $or: [
                { "name": { $regex: regex } },
                { "description": { $regex: regex } },
                { "category._categoryName": { $regex: regex } }
            ]
        }
    }
    if (filterExpress.pageIndex) delete filterExpress['pageIndex'];

    const products = await Product.find(filterExpress).skip((pageIndex - 1) * PAGE_SIZE).limit(PAGE_SIZE);
    const categories = await Category.find();

    const totalProduct = (await Product.find(filterExpress)).length;
    totalPage = Math.trunc(totalProduct / PAGE_SIZE)
    if (totalProduct % PAGE_SIZE != 0) totalPage++;
    let numPages;
    if (totalPage > 1) {
        numPages = [];
        for (let i = 1; i <= totalPage; i++) {
            numPages.push(i);
        }
    }

    //keep url
    let url = req.url;
    let indexPageQuery = url.indexOf('pageIndex');
    if (indexPageQuery !== -1) {
        url = url.substring(0, indexPageQuery - 1);
    }
    req.session.url = req.url;
    url = (url === req.route.path) ? (url + '?') : (url + '&');
    res.render("client/product", {
        products: products,
        categories: categories,
        numPages: numPages,
        pageIndex: pageIndex,
        url: url
    });
};



