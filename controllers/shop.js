const Product = require('../models/product');

const fs=require('fs');
const path=require('path');

const Order = require('../models/order');

exports.getProducts = (req, res, next) => {//controller 4 all Products
  Product.find()//sare k product uthaye method mongoose ka h 
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => {
      const error=new Error(err);
      error.httpStatusCode=500;
      return next(error);
    });
};

exports.getProduct = (req, res, next) => {//controller 4 Perticular  Product
  const prodId = req.params.productId;//Id fetch ki url se
  Product.findById(prodId)//Perticular product uthaya
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => {
      const error=new Error(err);
      error.httpStatusCode=500;
      return next(error);
    });};

exports.getIndex = (req, res, next) => {//4 all Products 
  Product.find()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
        csrfToken:req.csrfToken()
      });
    })
    .catch(err => {
      const error=new Error(err);
      error.httpStatusCode=500;
      return next(error);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .populate('cart.items.productId')//for a perticular item populate all details abhout Product
    .execPopulate()//it convert it into a promise
    .then(user => {
      const products = user.cart.items;
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      });
    })
    .catch(err => {
      const error=new Error(err);
      error.httpStatusCode=500;
      return next(error);
    });};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);//method user model m declayyer h 
    })
    .then(result => {
      res.redirect('/cart');
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => {
      const error=new Error(err);
      error.httpStatusCode=500;
      return next(error);
    });};

exports.postOrder = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items.map(i => {
        return { quantity:i.quantity, product:{ ...i.productId._doc }};
      });
      const order = new Order({
        user: {
          email:req.user.email,
          userId: req.user
        },
        products: products
      });
      return order.save();
    })
    .then(result => {
      return req.user.clearCart();//cart empty kar dega 
    })
    .then(() => {
      res.redirect('/orders');
    })
    .catch(err => {
      const error=new Error(err);
      error.httpStatusCode=500;
      return next(error);
    });};

exports.getOrders = (req, res, next) => {
  Order.find({ 'user.userId': req.user._id })
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(err => {
      const error=new Error(err);
      error.httpStatusCode=500;
      return next(error);
    });};
exports.getInvoice=(req,res,next)=>{
  const orderId=req.params.orderId;
  Order.findById(orderId).then(order=>{
    if(!order){
      return next(new Error('No Order Found'))
    }
    if(order.user.userId.toString()!==req.user._id.toString()){
      return next(new Error('Unauthorized'));
    }
      const invoiceName='fees.pdf';
      const invoicePath=path.join('data','invoices',invoiceName);
      // fs.readFile(invoicePath,(err,data)=>{
      //   if(err){
      //     return next(err);
      //   }
      // res.setHeader('Content-Type','application/pdf');
      // res.setHeader('Content-Desposition','inline;filename="'+invoiceName+'"');
      // res.send(data);
      //})
      const file=fs.createReadStream(invoicePath);
      res.setHeader('Content-Type','application/pdf');
      res.setHeader('Content-Desposition','inline;filename="'+invoiceName+'"');
      file.pipe(res);
  }).catch(err=>{
    console.log(err);
    return next(err);
  })
 
};