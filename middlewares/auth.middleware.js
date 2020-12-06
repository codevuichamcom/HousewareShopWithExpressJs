const User = require('../models/user.model');

module.exports.requireAuth = (req, res, next) => {
    if (!req.signedCookies.userId){
        res.redirect('/auth/login');
        return;
    }
    const user = User.findById(req.signedCookies.userId);
    if(!user){
        res.redirect('/auth/login');
        return;
    }
    next();
}

module.exports.getCurrentUser = async (req, res, next)=>{
    if(req.signedCookies.userId){
        const user = await User.findOne({"_id" : req.signedCookies.userId});
        if(user){
            res.locals.user = user;
        }
    }
    next();
}