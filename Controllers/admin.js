const Product = require("../models/product");
const mongoDb = require("mongodb");
const ObjectId = mongoDb.ObjectId;

exports.getaddproduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    isAuthenticated:req.session.isLoggedIn,
  });
};

exports.postaddproduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product({
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description,
    userId:req.user,
  });
  product
    .save()
    .then((result) => {
      // console.log("Product Added");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.geteditproduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const proId = req.params.productId;
  Product.findById(proId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      } else {
        res.render("admin/edit-product", {
          pageTitle: "Edit Product",
          editing: editMode,
          path: "/admin/edit-product",
          product: product,
          isAuthenticated:req.session.isLoggedIn,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const utitle = req.body.title;
  const uprice = req.body.price;
  const uimageUrl = req.body.imageUrl;
  const udescription = req.body.description;
  Product.findById(prodId)
    .then((product) => {
      product.title = utitle;
      product.price = uprice;
      product.imageUrl = uimageUrl;
      product.description = udescription;
      return product.save();
    })
    .then((result) => {
      // console.log("Product Updated");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
        isAuthenticated:req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByIdAndDelete(prodId)
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};
