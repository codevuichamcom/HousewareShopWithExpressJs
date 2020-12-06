const md5 = require('md5');

const User = require('../models/user.model');
const Category = require('../models/category.model');

module.exports.getLogin = async (req, res) => {
    const categories = await Category.find();
    res.render('auth/login', {
        categories: categories
    });
}

module.exports.postLogin = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    const categories = await Category.find();
    if (!user) {
        res.render('auth/login', {
            errors: [
                'User does not exist'
            ],
            values: req.body,
            categories: categories
        });
        return;
    }

    const hashedPassword = md5(password);
    if (user.password !== hashedPassword) {
        res.render('auth/login', {
            errors: [
                'Wrong password'
            ],
            values: req.body,
            categories: categories
        });
        return;
    }

    console.log(user);
    res.cookie('userId', user._id, { signed: true });
    res.redirect('/');
}

module.exports.logout = function (req, res) {
    res.clearCookie('userId');
    res.redirect('/login');
};