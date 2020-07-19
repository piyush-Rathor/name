const http=require('http');
const express =require('express');
const app=express();
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use((req,res,next)=>{
console.log("i m permanent");
next();
});
app.use('/auto',(req,res,next)=>{
res.send('<form action="/product" methord="POST" ><input type="text" name="title"><button type="submit">ADD_Product</button></form>');
});
app.use('/product',(req,res,next)=>{
    console.log(req.body);
    res.redirect('/');
});
app.use('/',(req,res,next)=>{
    res.send('<h1>This is a responce</h1>');
    });
app.listen(3000);