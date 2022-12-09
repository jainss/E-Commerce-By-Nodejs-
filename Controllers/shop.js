const Product = require("../models/product");
const Cart=require("../models/cart");

exports.getproducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
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
    res.render("shop/index", { prods: products, pageTitle: "shop", path: "/" });
  });
};

exports.getCart = (req, res, err) => {
  Cart.getCart(cart=>{
    Product.fetchAll(products=>{
      const cartProducts=[];
      for(product of products){
        const cartProductData=cart.products.find(prod=>prod.id===product.id);
        if(cartProductData){
          cartProducts.push({productData:product,qty:cartProductData.qty});
        }
      }
      res.render("shop/cart", {
        pageTitle: "Your Cart",
        path: "/cart",
        products:cartProducts
      });
    })
  })
 
};

exports.postCart = (req, res, next) => {
  const prodId=req.body.productId;
  Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
};

exports.postCartDeleteProduct=(req,res,next)=>{
  const prodId=req.body.productId;
  Product.findById(prodId,product=>{
    Cart.deleteProduct(prodId,product.price);
    res.redirect('/cart');
  });
}


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
