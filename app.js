const path = require('path');
//Progrram ka exicution yha se strat hua....sabse pahale esne path directry ko import kiya such that ham path vagera add kar sake 

const express = require('express');//Import express library
const bodyParser = require('body-parser');//Import body parser becouse hame data ek jagah store karana h 

const errorController = require('./controllers/error');//Ek file ko impost kiya jo ki controllers m h n name h uska error.js
const sequelize=require('./util/database');//database require kiya 
const Product=require('./models/product');
const User=require('./models/user');

const app = express();//Making App using express() function jo ki hamane pahale hi import kar rakha h 

app.set('view engine', 'ejs');//set method is used for setting any globlly value in your express application//"So yha p engine set kar rha globbaly "ejs" view engine allow tell express 4 any type of dynammic template v r using here it is ejs" 
app.set('views', 'views');//Ejs engine pahale wala views keyword h dusara wala folder ka nam jisame apki files rakhi h.. 

const adminRoutes = require('./routes/admin');//File ko require kiya jiska path given h es file ka use 20th line kiya h..yha p variable asine kiya h jo ki us file ko exs kar sake bad m 
const shopRoutes = require('./routes/shop');//File ko require kiya jiska path given h es file ka use 21th line kiya h..
//const user = require('./models/user');

app.use(bodyParser.urlencoded({ extended: false }));//ye line Body k content ko lene m h...Sab data ko collect krane m h jo user data dega
app.use(express.static(path.join(__dirname, 'public')));//Yha p path join h ye ejs file m jo css use hui h wo <= folder h to uska file ka path add karana padega

app.use('/admin', adminRoutes);//File ka exicution hoga jo hamane 14th line import ki h ..or jo age path laga h /admin wo url ko filter karane k liye h 
app.use(shopRoutes);//File ka exicution hoga jo hamane 15th line import ki h ..or jo age path laga h /admin wo url ko filter karane k liye h

app.use((req,res,next)=>{
    User.findByPk(1)
    .then(user=>{
        req.user=user;
        next()
        .catch(err=>console.log(err));
    })
})
app.use(errorController.get404);//Ye file 7th line m import ki gyi h ab use kiya h uska ...Simply jab user koi ulta sidha url dal dega tab exicute hogi ye

Product.belongsTo(User,{contrains:true,onDelete:'CASCADE'});
User.hasMany(Product);

sequelize.sync().then(result=>{//sync method look your modules and covert into tables if tables allready exist than ye bna rahane dega
    return User.findByPk(1);
}).then(user=>{
    if(!user){
        return User.create({name:'piyush',email:'psrathor16072000@gmail.com',id:1});
    }
    return user;
}).then(user=>{
    app.listen(3000);//jab tables creat ho jaegi tab hi server on hoga agar table kisi karan creat na ho payi to server start hi na hooga 
}).catch(err=>{
    console.log(err);//Agar koi aati h tohame use handle karana hoga esliye ham use log m dekh le rhe h 
});
/* 
Exicution start=>
* Sari file import hui,(path file for setting path,express library for using express fx,errorcontroller import kiya file ko exicute karane k liye and same in admin and shop) 
* Engine set hua ejs ka 
* Body parser code chala but abhi(exicution time) h ni parse karane k liye to abhini hua 
* 19th line m path add hua 
* 21th url aaya (user se) exicution pahucha routes folder m admin.js file m..wo sab chalega under the conditions
* than shoproutes ki bari ayyegi
*
*/

