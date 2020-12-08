const express = require('express');
const router = express.Router();

const controller= require('../controllers/cart.controller');
router.get('/',controller.index);
router.get('/add/:productId',controller.addToCart);
router.post('/sync',controller.syncCart);
router.get('/delete/:productId',controller.deleteCart);
module.exports=router;