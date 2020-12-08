const md5 = require('md5');

const User = require('../models/user.model');

module.exports.getLogin = async (req, res) => {
    res.render('auth/login');
}

module.exports.postLogin = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
        res.render('auth/login', {
            errors: [
                'User does not exist'
            ],
            values: req.body
        });
        return;
    }

    const hashedPassword = md5(password);
    if (user.password !== hashedPassword) {
        res.render('auth/login', {
            errors: [
                'Wrong password'
            ],
            values: req.body
        });
        return;
    }

    res.cookie('userId', user._id, { signed: true });
    res.redirect('/');
}

module.exports.logout = function (req, res) {
    res.clearCookie('userId');
    res.redirect('/auth/login');
};