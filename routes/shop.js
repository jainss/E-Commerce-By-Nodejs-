const express = require("express");
const router = express.Router();
const ShopController= require('../Controllers/shop');
const path = require('path');

router.get("/", ShopController.getIndex);
router.get("/products",ShopController.getproducts);
router.get("/checkout",ShopController.getCheckout);
router.get("/product/:productId",ShopController.getProduct);
router.get("/cart",ShopController.getCart);
router.post("/cart",ShopController.postCart);
router.post("/cart-delete-item",ShopController.postCartDeleteProduct)
router.get("/orders",ShopController.getOrders);
// router.get('/checkout', shopController.getCheckout);

module.exports = router;
