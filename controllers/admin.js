// by convention name of imported class names with capital letter
const Product = require('../models/product')

exports.getAddProduct = (request, response, next) => {

    response.render('admin/edit-product', {
        pageTitle: 'Add Product',
        // for dynamic active effect in nav menu for Add product
        path: '/admin/add-product',
        editing: false
    });
};

exports.postAddproduct = (request, response, next) => {

    const title = request.body.title;
    const imageUrl = request.body.imageUrl;
    const price = request.body.price;
    const description = request.body.description;

    const product = new Product(null, title, imageUrl, description, price);
    product.save()
        .then( () => {
            response.redirect('/');
        })
        .catch( err => {
            console.log(err);
        });

}

exports.getEditProduct = (request, response, next) => {

    const editMode = request.query.edit;

    if (!editMode) {
        return response.redirect('/');
    }

    //params property is from router.get('/edit-product/:productId', adminController.getEditProduct)
    // located in controllers/admin.js
    // :productId is a value of params property
    const prodId = request.params.productId;

    Product.findById( prodId, product => {

        if (!product) {
            return response.redirect('/');
        }

        response.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });
    });
};

exports.postEditProduct = (request, response, next) => {
    const prodId = request.body.productId;
    const updatedTitle = request.body.title;
    const updatedPrice = request.body.price;
    const updatedImageUrl = request.body.imageUrl;
    const updatedDesc = request.body.description;

    const updatedProduct = new Product(
        prodId, updatedTitle, updatedImageUrl, updatedDesc, updatedPrice
    )

    updatedProduct.save();

    response.redirect('/admin/products');
}

exports.getProducts = (request, response, next) => {

    Product.fetchAll( products => {
        // views/shop/index.ejs
        response.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        });
    });
}

exports.postDeleteProduct = (request, response, next) => {

    const prodId = request.body.productId;

    Product.deleteById(prodId);

    response.redirect('/admin/products');

}

















