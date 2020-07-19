const express=require('express');

const path=require('path');

const router=express.Router();

router.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'..','/practice_html','3.html'));
    });

module.exports=router;