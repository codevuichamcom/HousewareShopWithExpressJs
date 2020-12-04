require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});

const port = process.env.PORT||3000;

app.set('view engine', 'pug');
app.set('views', './views');


app.use(express.static('public'))
// routes
const mainRoute = require('./routes/main.route');
app.use('/',mainRoute);

 
app.listen(port,()=>{
    console.log('Server start at '+port);
});

