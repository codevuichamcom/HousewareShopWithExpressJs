
const Product = require('../models/product.model');
const Session = require('../models/session.model');

module.exports.index = (req, res) => {
    const { cart } = req.session;

    let totalPrice = 0;
    for (c of cart) {
        totalPrice += c.price * c.quantity;
    }
    res.render('cart/index', {
        cart: cart,
        totalPrice: totalPrice
    });
}
module.exports.addToCart = async (req, res) => {
    const { productId } = req.params;
    const { sessionId } = req.signedCookies;

    if (!sessionId) {
        res.redirect('/');
        return;
    }

    //add cart to db
    const session = await Session.findOne({ _id: sessionId });

    let count = session.get('cart.' + productId) || 0;
    session.set('cart.' + productId, count + 1).save();

    //add cart to session
    let cart = req.session.cart;
    let isProductExist = false;
    for (c of cart) {
        if (c._id === productId) {
            c.quantity++;
            isProductExist = true;
        }
    }
    if (!isProductExist) {
        const product = await Product.findOne({ _id: productId });
        product.quantity = 1;
        cart.push(product);
    }
    req.session.cart = cart;

    const url = req.session.url;
    res.redirect(url);
}
module.exports.syncCart = async (req, res) => {

    const { sessionId } = req.signedCookies;
    const quantity = req.body;

    let cart = req.session.cart;
    //update in session
    let i = 0;
    for (q in quantity) {
        cart[i++].quantity = quantity[q];
    }

    //update cart in db
    const session = await Session.findOne({ _id: sessionId });
    for (c of cart) {
        session.set('cart.' + c._id, c.quantity).save();
    }

    req.session.cart = cart;
    res.redirect('/cart');
}
module.exports.deleteCart = async (req, res) => {
    const { sessionId } = req.signedCookies;
    const { productId } = req.params;

    let cart = req.session.cart;
    const session = await Session.findOne({ _id: sessionId });

    if (productId === '-1') {
        cart=[];
        session.set('cart', undefined).save();
    } else {
        //remove in session
        for (let i = 0; i < cart.length; i++) {
            if (cart[i]._id === productId) {
                cart.splice(i, 1);
                i--;
            }
        }



        //remove in db
        if(cart.length){//if have no product, remove cart
            session.set('cart.' + productId, undefined).save();
        }else{ //remove product in cart
            session.set('cart', undefined).save();
        }
        

    }
    req.session.cart = cart;
    res.redirect('/cart');
}
