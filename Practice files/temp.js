const express=require('express');
const router=express.Router();
router.use('/add',(req,res,next)=>{
    console.log("In the another middleware 5nd time");
    res.send('<h1>Hyyyy</h1>');
});

router.use('/addo',(req,res,next)=>{
    console.log("In the another middleware 2nd time");
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add_product</button></form>');
});
router.post('/product',(req,res,next)=>{
    console.log("In the another middleware 3rd time ");
    console.log(req.body);
    res.redirect('/a');
});
router.use('/a',(req,res,next)=>{
    console.log("In the another middleware 4rd time ");
    res.send("I m redirecting File");
});
module.exports=router;