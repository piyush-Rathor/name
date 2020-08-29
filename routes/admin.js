const path = require('path');

const {body}=require('express-validator/check');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

const isAuth=require('../middleware/is-auth');//eska  kam h chek karana user login wala h ya na 

// /admin/add-product => GET
router.get('/add-product', isAuth,adminController.getAddProduct);//multiple controller trigger honge isAuth check karega k user login wala h ya na

// /admin/products => GET
router.get('/products', isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', [
    body('title').isString().isLength({min:3}).trim().withMessage('At least 3 Charrcter Long Title'),
    body('price').isFloat().withMessage("Price is required For float at 2 digit "),
    body('description').isLength({min:5,max:400}).trim().withMessage("Description At least Contain 5 Char and max 400 Characters")
],isAuth, adminController.postAddProduct);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/edit-product', [
    body('title').isString().isLength({min:3}).trim().withMessage('At least 3 Charrcter Long Title'),
    body('price').isFloat().withMessage("Price is required For float at 2 digit "),
    body('description').isLength({min:5,max:400}).trim().withMessage("Description At least Contain 5 Char and max 400 Characters")
], isAuth, adminController.postEditProduct);

router.delete('/product/:productId', isAuth, adminController.deleteProduct);

module.exports = router;
