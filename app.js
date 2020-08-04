const path = require('path');

const express = require('express');//require Express for fun
const bodyParser = require('body-parser');//Body parser for parsing the data

const errorController = require('./controllers/error');//require kiya h controller error p render karenge
const mongoose=require("mongoose");//Mongoose require kiya 
const User=require('./models/user');//require kiya user model

const app = express();//Express ko import kiya using format m

app.set('view engine', 'ejs');//engine set ejs ka 
app.set('views', 'views');//folder diya views ka anf folder ka nam batya

const adminRoutes = require('./routes/admin');//router File ko require kiya for handling router
const shopRoutes = require('./routes/shop');//router File ko require kiya for handling router

app.use(bodyParser.urlencoded({ extended: false }));//body parser m use hota h 
app.use(express.static(path.join(__dirname, 'public')));//css FIle ka path set kiya h

app.use((req, res, next) => {//ye middleware hamare project ko hamare dummy user se connect karane k liye h
  User.findById("5f23d78d44ae3c036d8ab22f")//FindById method mongoose ka h hamane ese declayer ni kiya chuki ham mongoose k model p ye kam kar rhe h esliye yha sidh sidhe ye kam karega
    .then(user => {//Return eliment ko hamane store kar liya 
      req.user = user;//hamane apne pure k pure user modul ko req m store kar diya jisake sath mongoose b h q k mongoose ka object tha
      next();//for aage ka procedure esme lagana padata h 
    })
    .catch(err => console.log(err));//Agar koi err aa jaye to malum pad jaye kya problum h 
});

app.use('/admin', adminRoutes);//AAge jo /admin laga wo filtration k liye h ye kisi perticular url p tab hi chalega jab uske aage admin hoge 
app.use(shopRoutes);//ye sidhe router ja rhi  h
app.use(errorController.get404);//Router for error 

mongoose//using MOngoose
  .connect(//Connecting Mongoose
    'mongodb+srv://Piyush123:Piyush123@cluster0.v594s.mongodb.net/shop?retryWrites=true&w=majority'//link copy from data creation in mongodb
    )
  .then(result => {
    User.findOne().then(user => {//user model findOne method=>{findOne method mongoose ka esme agar condition h to wo pericular elimentreturn karega or agar condition ni h to pahala eliment return karega}
      if (!user) {//Agar usme kuch na to matlab koi b user na hua to
        const user = new User({//hamane user model m ek constructer bnaya h usi ka object bna rhe h ham 
          name: 'Max',//uske arguments ko vvalue de rhe actully hame object pass karana padata h jo constructer ham mongoose ki madad se bnate h usme 
          email: 'max@test.com',
          cart: {//just give values to it constructer pass kar diya 
            items: []
          }
        });
        user.save();//calling method is also a mongoose method it will save it on database
      }
    });
    app.listen(3000);//after saving this just on over server
  })
  .catch(err => {//catch error if any found
    console.log(err);
  });
