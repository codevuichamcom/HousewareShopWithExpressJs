const Session = require('../models/session.model');
const Product = require('../models/product.model');
const Category = require('../models/category.model');
module.exports = async (req, res, next) => {
    const sessionId = req.signedCookies.sessionId;
    if (!sessionId) {
        await Session.create({ cart: {} }, (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.cookie('sessionId', result._id, { signed: true });
            }
        });
    } else {
        const session = await Session.findOne({ _id: sessionId });
        if (!session) {
            await Session.create({ cart: {} }, (err, result) => {
                if (err) {
                    res.send(err);
                } else {
                    res.cookie('sessionId', result._id, { signed: true });
                }
            });
        } else {

            if (!req.session.cart) {
                const cart = session.get('cart') || {};
                let products = [];
                if (cart) {
                    for (c in cart) {
                        let product = await Product.findOne({ _id: c });
                        product.quantity = cart[c];
                        products.push(product);

                    }
                }
                req.session.cart = products;
            }

        }
    }

    res.locals.cart = req.session.cart || [];
    res.locals.categories = req.session.categories || await Category.find();
    next();
}