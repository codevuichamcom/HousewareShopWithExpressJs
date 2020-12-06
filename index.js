require('dotenv').config()


const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});

const cookieParser = require('cookie-parser');

const port = process.env.PORT||3000;

app.set('view engine', 'pug');
app.set('views', './views');


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SECRET_KEY));

app.use(express.static('public'))
// routes
const mainRoute = require('./routes/main.route');
const authRoute = require('./routes/auth.route');

//middleWares
const authMiddleware  = require('./middlewares/auth.middleware');
app.use('/',authMiddleware.getCurrentUser,mainRoute);
app.use('/',authRoute);

 
app.listen(port,()=>{
    console.log('Server start at '+port);
});

