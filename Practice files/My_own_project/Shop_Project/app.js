const express=require('express');

const path=require('path');

const router=express.Router();

const shop=require('./Router/admin.js');

app=express();

app.use(express.static(path.join(__dirname,'Public')));

app.use('/shop',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'Public','Html','b.html'));
});

app.use((req,res,next)=>{
res.sendFile(path.join(__dirname,'Public','html','a.html'));
});

app.use(shop);

app.listen(3000);