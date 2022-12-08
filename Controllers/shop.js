const Product = require("../models/product");
const Cart=require("../models/cart");

exports.getproducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "Shop",
      path: "/products",
    });
  });
};

exports.getProduct=(req,res,next)=>{
  const prodId=req.params.productId;
  Product.findById(prodId,product=>{
    res.render('shop/product-details',
    {product:product,
     pageTitle:product.title,
     path:'/products'
    });
  })
}; 

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", { prods: products, pageTitle: "", path: "/" });
  });
};

exports.getCart = (req, res, err) => {
  res.render("shop/cart", {
    pageTitle: "Your Cart",
    path: "/cart",
  });
};

exports.postCart = (req, res, next) => {
  const prodId=req.body.productId;
  Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
};


exports.getOrders = (req, res, err) => {
  res.render("shop/orders", {
    pageTitle: "Your Orders",
    path: "/orders",
  });
};

exports.getCheckout = (req, res, err) => {
  res.render("/shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};
