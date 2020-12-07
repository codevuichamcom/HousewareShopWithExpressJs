const mongoose = require('mongoose');
const { Schema } = mongoose;

const sessionSchema = new Schema({
    cart: Object
});

const Session = mongoose.model('Session', sessionSchema, 'sessions');

module.exports = Session;