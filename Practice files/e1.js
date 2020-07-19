const http = require('http');

const express= require('express');

const app = express();
app.use((req,res,next)=>{// it accepts an array of so-called request handlers here ana its some other cases to
console.log('hey guys i m middleware'); 
next();//bacicaly i send exicution to another use ..if we r not use that it will stop exicution..
});
app.use((req,res,next)=>{// it accepts an array of so-called request handlers here ana its some other cases to
    console.log('hey guys i a another middleware'); 
    });

const server =http.createServer(app);// bacically app is variable conaining express library..
server.listen(3000);
//And this syntax of how to use expess js