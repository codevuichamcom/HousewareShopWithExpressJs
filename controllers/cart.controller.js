
const Session = require('../models/session.model');

module.exports.index = (req,res)=>{
    res.redirect('/');
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

    const url = req.session.url;
    res.redirect(url);
}
