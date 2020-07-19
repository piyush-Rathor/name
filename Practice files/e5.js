const http=require('http');
const express =require('express');
const app=express();
app.use((req,res,next)=>{
console.log("i m permanent");
next();
});
app.use('/auto',(req,res,next)=>{
res.send('<h1>jfjyu</h1>');
});
app.use('/',(req,res,next)=>{
    res.send('<h1>jjuygyuftdtyhgf</h1>')
    });
app.listen(3000);