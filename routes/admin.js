const express = require("express");
const router = express.Router();
const path = require('path');
const adminController = require('../Controllers/admin');

router.get("/add-product", adminController.getaddproduct);
router.get("/products", adminController.getProducts);

router.post("/add-product", adminController.postaddproduct);

router.get("/edit-product/:productId",adminController.geteditproduct);

router.post("/edit-product",adminController.postEditProduct);

router.post('/delete-product',adminController.postDeleteProduct);
module.exports = router;

