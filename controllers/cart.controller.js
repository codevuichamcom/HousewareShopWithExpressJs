
const Product = require('../models/product.model');
const Session = require('../models/session.model');

module.exports.index = (req,res)=>{
    const {cart} = req.session;
    res.render('cart/index',{
        cart:cart
    });
}
module.exports.addToCart = async (req,res)=>{
    const {productId} = req.params;
    const {sessionId} = req.signedCookies;

    if(!sessionId){
        res.redirect('/');
        return;
    }

    const session =await Session.findOne({_id:sessionId});

    let count = session.get('cart.'+productId)||0;
    session.set('cart.'+productId,count+1).save();

    let cart = req.session.cart;
    let isProductExist=false;
    for(c of cart){
        if(c._id===productId){
            c.quantity++;
            isProductExist=true;
        }
    }
    if(!isProductExist){
        const product =await Product.findOne({_id:productId});
        product.quantity=1;
        cart.push(product);
    }
    req.session.cart = cart;

    const url = req.session.url;
    res.redirect(url);
}
