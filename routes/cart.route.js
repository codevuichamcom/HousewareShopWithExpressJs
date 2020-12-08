const express = require('express');
const router = express.Router();

const controller= require('../controllers/cart.controller');

const authMiddleware = require('../middlewares/auth.middleware');
router.get('/$',controller.index);
router.get('/add/:productId',controller.addToCart);
router.post('/sync$',controller.syncCart);
router.get('/delete/:productId',controller.deleteCart);
router.get('/checkout',authMiddleware.requireAuth,controller.getCheckOut);
router.post('/checkout',authMiddleware.requireAuth,controller.postCheckOut);
module.exports=router;