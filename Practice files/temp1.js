const express=require('express');
//Files ko connect kiya.....
const tempRouters=require('./temp');
const temp2Routers=require('./temp2');

const bodyParser=require('body-parser');
const app=express();
app.use(bodyParser.urlencoded({extended : false}));
app.use(tempRouters);
app.use(temp2Routers);
//Files jo connect ki h upar unhe use kar liya ...



app.listen(3000);