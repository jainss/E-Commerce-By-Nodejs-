const express = require("express");
const router = express.Router();
const path = require('path');
const adminController = require('../Controllers/admin');

router.get("/add-product", adminController.getaddproduct);
router.get("/products", adminController.getproducts);

router.post("/add-product", adminController.postaddproduct);

module.exports = router;

