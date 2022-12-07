const Product=require('../models/product');

exports.getaddproduct=(req, res, next) => {
    res.render(
    'add-product',{pageTitle:'Add Product',
    path:'/admin/add-product'
});
};

exports.postaddproduct=(req, res, next) => {
    const product= new Product(req.body.title);
    product.save();
    res.redirect("/");
};


exports.getproducts=(req, res, next) => {
    Product.fetchAll( products=>{
        res.render(
            'shop',{prods:products,
            pageTitle:'Shop',
            path:'/',
            hasproducts:products.length>0,
            activeshop : true,
        });
    });
};


