// by convention name of imported class names with capital letter
const Product = require('../models/product');
const Cart = require('../models/cart');


exports.getProducts = (request, response, next) => {

    // here we use static method from '../models/product'
    // cb is callback
    Product.fetchAll()
        .then( ( [rows, fieldData] ) => {
            response.render('shop/product-list', {
                prods: rows,
                pageTitle: 'All Products',
                path: '/products'
            });
        })
        .catch( err => console.log(err));
}

exports.getProduct = (request, response, next) => {

    const prodId = request.params.productId;

    Product.findById(prodId)
        .then( ([product]) => {

            response.render('shop/product-detail', {
                product: product[0],
                pageTitle: product.title,
                path: '/products'
            });
        })
        .catch( err => console.log(err));

}

exports.getIndex = (request, response, next) => {

    Product.fetchAll()
        // [rows, fieldData] are destructuring of result, the names can be arbitrary
        .then( ( [rows, fieldData] ) => {
            response.render('shop/index', {
                prods: rows,
                pageTitle: 'Shop',
                path: '/'
            });
        })
        .catch( err => console.log(err));

};

exports.getCart = (request, response, next) => {

    Cart.getCart( cart => {

        Product.fetchAll( products => {

            const cartProducts = [];

            for (let product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if (cartProductData) {
                    cartProducts.push({productData: product, qty: cartProductData.qty });
                }
            }

            response.render('shop/cart', {
                pageTitle: 'Your Cart',
                path: '/cart',
                products: cartProducts
            });
        });
    });
}


exports.postCart = (request, response, next) => {

    const prodId = request.body.productId;

    Product.findById( prodId, product => {
        Cart.addProduct(prodId, product.price);
    });

    response.redirect('/cart')

}

exports.postCartDeleteProduct = (request, response, next) => {

    const prodId = request.body.productId;

    Product.findById(prodId, product => {

        Cart.deleteProduct(prodId, product.price);

        response.redirect('/cart');
    });
}


exports.getOrders = (request, response, next) => {

    response.render('shop/orders', {
        pageTitle: 'Your Orders',
        path: '/orders'
    })
}

exports.getCheckout = (request, response, next) => {

    response.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout'
    });
}
















