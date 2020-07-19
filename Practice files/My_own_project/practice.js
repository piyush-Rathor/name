const express=require('express');

const router=express.Router();

const rount1=require('./practice/1.js');
const rount2=require('./practice/2.js');
const error=require('./practice/404.js');


const bodyParser=require('body-parser');
app=express();
app.set('view engine','pug');
app.set('views','practice_html');
app.use(bodyParser.urlencoded({extended:false}));

app.use(rount1);
app.use(rount2);
app.use(error);


app.listen(3000);