//Ye file import ki gyi h app.js m or yh ap b routing handel ki jaegi esliye hamane yha p router nam ka variable bnaya
// const path = require('path');

const express = require('express');// Q k ye js file h yha b express import kiya ...

const adminController = require('../controllers/admin');//Yha b ek file require ki and uska b path diya and variable m asine kiya

const router = express.Router();//Create router q k ye file se handle ki ja rhi h matlab ja rhi h ..es file ko app.js m export kar rhe na esliye

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);// /admin/add-product => GET es url p jab get method hoga tab chalega jo ki call kar rha file ko jo hamane pahale import ki thi

// /admin/products => GET
router.get('/products', adminController.getProducts);// /admin/products => GET ...es url p jab get method hoga tab chalega jo ki call kar rha file ko jo hamane pahale import ki thi

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);// /admin/add-product => POST..es url p jab get method hoga tab chalega jo ki call kar rha file ko jo hamane pahale import ki th

router.get('/edit-product/:productId', adminController.getEditProduct);// /admin/add-product => POST..es url p jab get method hoga tab chalega jo ki call kar rha file ko jo hamane pahale import ki th

router.post('/edit-product',adminController.postEditProduct);//ye route hamane edit product k liye bnaya h such that admin jab edit p click to ye controller chale

router.post('/delete-product', adminController.postDeleteProduct);


module.exports = router;//es nam se export kar di 
/* 
ham es file m url ko manage kar rhe h or ye jitane b url,s h jinhe ham managae kar rhe h unhe user sidhe jake b exis kar 
kar sakata h as well localhost:3000 jo page aayenge uske pages ko wha p b pahuch sakte h 
* Ab yha p sare url,s kuch kuch specific methods p render honge hamane controllers ki file import ki h jisase ki ham specific code chala sake 
har method k liye specific controllers bna diya h usko run kar diya h 

*/