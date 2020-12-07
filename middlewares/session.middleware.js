const Session = require('../models/session.model');
const Product = require('../models/product.model');
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
        }else{
            const cart = session.get('cart');
            let products = [];
            for(c in cart){
                let product = await Product.findOne({_id:c});
                product.quantity = cart[c];
                products.push(product);

            }
            res.locals.productCarts = products;              
        }
    }
    next();
}