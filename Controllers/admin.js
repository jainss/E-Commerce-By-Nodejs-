const Product = require("../models/product");

exports.getaddproduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing:false

  });
};

exports.postaddproduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null,title, imageUrl, price, description);
  product.save();
  res.redirect("/");
};

exports.geteditproduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const proId = req.params.productId;
  Product.findById(proId, (product) => {
    
    if(!product){
        return res.redirect('/');
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product:product
    });
  });
};

exports.postEditProduct=(req,res,next)=>{
  console.log(req.body)
    const prodId=req.body.productId;
    const utitle=req.body.title;
    const uprice=req.body.price;
    const uimageUrl=req.body.imageUrl;
    const udescription=req.body.description;
    console.log(prodId, utitle, uprice, uimageUrl, udescription)
    const updatedProduct =new Product(prodId,utitle,uimageUrl,uprice,udescription);
    updatedProduct.save();
    res.redirect('/admin/products');
};

exports.getproducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};


exports.postDeleteProduct = (req,res,next)=>{
  const prodId=req.body.productId;
  // console.log("ids",prodId);
  Product.deleteById(prodId);
  // console.log(prodId);
  res.redirect('/admin/products');
}