const express= require('express');

const app = express();
qpp.use((req,res,next)=>{
console.log("I m permanent!..");
next();
});
app.use('/hy',(req,res,next)=>{// this is for url
    console.log('hey guys i a another middleware jj'); 
    res.send('<h1>hello from express at localhost:3000/hy</h1>'); // this is first becouse yha p pahali bat next ni likha h and agale wale / likha esme kuch b aaega sab exicute ho jaega
});

app.use('/',(req,res,next)=>{// this is for url// ye sabhi ko exicute kar dega ...
    console.log('hey guys i a another middleware'); 
    res.send('<h1>hello from express</h1>'); 
});


app.listen(3000);
