const express=require('express');
const router=express.Router();
//jese hamane app m rakha tha wese hi 
router.use((req,res,next)=>{
    console.log("hjfgjf");
    res.send('<h1>Error 404</h1>');
});
module.exports=router;