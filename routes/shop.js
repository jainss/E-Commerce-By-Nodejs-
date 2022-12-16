const express = require("express");
const router = express.Router();
const ShopController= require('../Controllers/shop');
const path = require('path');

router.get("/", ShopController.getIndex);
router.get("/products",ShopController.getProducts);
router.get("/product/:productId",ShopController.getProduct);
router.get("/cart",isAuth,ShopController.getCart);
router.post("/cart",isAuth,ShopController.postCart);
router.post("/cart-delete-item",isAuth,ShopController.postCartDeleteProduct)
router.get("/orders",isAuth,ShopController.getOrders);
router.post('/create-order',isAuth, ShopController.postOrder);

module.exports = router;

