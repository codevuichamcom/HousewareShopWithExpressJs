require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});

const port = process.env.PORT||3000;
app.get('/', function (req, res) {
  res.send('Hello World');
})
 
app.listen(port,()=>{
    console.log('Server start at '+port);
});

