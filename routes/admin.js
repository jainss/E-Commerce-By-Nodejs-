const express = require("express");
const router = express.Router();
const adminController = require('../Controllers/admin');
const isAuth=require('../middleware/is-auth');

router.get("/add-product",isAuth, adminController.getaddproduct);

router.get("/products",isAuth, adminController.getProducts);

router.post("/add-product",isAuth, adminController.postaddproduct);

router.get("/edit-product/:productId",isAuth,adminController.geteditproduct);

router.post("/edit-product",isAuth,adminController.postEditProduct);

router.post('/delete-product',isAuth,adminController.postDeleteProduct);

module.exports = router;

