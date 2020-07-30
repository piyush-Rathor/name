// const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);//Home directry p kya display ho rha ye wo bta rha for this v go shopcontler=>controller folder k andar shop

router.get('/products', shopController.getProducts);

// router.get('/products/:productId',shopController.getProduct);//yha p : bta rha h k :k bad ka part kuch b ho ese chala do productId m ese store kar lo 

// router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);//use for clicking in form submition of add to cart

// router.post('/cart-delete-item', shopController.postCartDeleteProduct);

// router.post('/create-order',shopController.postOrder);

// router.get('/orders', shopController.getOrders);

// router.get('/checkout', shopController.getCheckout);

module.exports =router;
/*
ham yha shop se related sare kam karenge matlab jialane b rout h shop se related ham handel karenge 
sare urls ko render karenge alag alg pages ko render karenge controllers ko handel karenge according to the requarment
*/
