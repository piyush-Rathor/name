const express=require('express');

const path=require('path');

const router=express.Router();

const adminData=require('./1.js');

router.get('/',(req,res,next)=>{//Now it is fix for home page
    res.send("<h1>This is HomePage</h2>");
});

router.get('/ab',(req,res,next)=>{//Now it is fix for home page
    res.sendFile(path.join(__dirname,'..','/practice_html','2.html'));
    console.log(adminData.products);
    // req.body="dgdg";
    // console.log(req.body);  Ham enhe yha b axis kar skate h
});

module.exports=router;