const express = require('express');
const router = express.Router();

const controller= require('../controllers/main.controller');

router.get('/',controller.home);
router.get('/detail',controller.detail)
router.get('/get-list-product',controller.products)
module.exports=router;