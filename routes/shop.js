const express = require("express");
const router = express.Router();
const productController= require('../controllers/products');
const path = require('path');
const adminproduct= require('./admin.js');

router.get("/", productController.getproducts);

module.exports = router;
