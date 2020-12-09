require('dotenv').config()


const express = require('express');
const app = express();
const session = require('express-session');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const cookieParser = require('cookie-parser');

const port = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'somesecret',
    cookie: { maxAge: 30*60*1000 }
}));

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SECRET_KEY));

app.use(express.static('public'))
// routes
const mainRoute = require('./routes/main.route');
const authRoute = require('./routes/auth.route');
const cartRoute = require('./routes/cart.route');

const apiProductRoute = require('./api/routes/product.route');

//middleWares
const authMiddleware = require('./middlewares/auth.middleware');
const sessionMiddleware = require('./middlewares/session.middleware');

app.use(sessionMiddleware);
app.use('/', authMiddleware.getCurrentUser, mainRoute);
app.use('/auth', authRoute);
app.use('/cart', cartRoute);

//api
app.use('/api/products',apiProductRoute);


app.listen(port, () => {
    console.log('Server start at ' + port);
});

