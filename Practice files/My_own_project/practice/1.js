const express=require('express');

const path=require('path');

const router=express.Router();

const products=[];

router.use('/admin',(req,res,next)=>{
    const products=rount1.products;
    res.render('shop',{prods:products,docTitle:'shop'});
}); 

router.post('/product',(req,res,next)=>{
    //req.body="abc";// //Here w fix the the body
    products.push({title:req.body.title});
    console.log(req.body);
    //res.send("<h1>hjgj</h1>");
    res.redirect('/ab');
});

module.exports=router;
module.exports.products=products;