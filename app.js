const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session=require('express-session');
const mongoDBStore=require('connect-mongodb-session')(session);//ye ek constructer return karega
const csrf=require('csurf');

const errorController = require('./controllers/error');
const User = require('./models/user');

MONGODB_URI='mongodb+srv://Piyush123:Piyush123@cluster0.v594s.mongodb.net/shop?retryWrites=true&w=majority';

const app = express();
const store=new mongoDBStore({
  uri:MONGODB_URI,
  collection:'Session'//collection jha tum apne database m session store karoge nam diya h database m
})

const csrfProtection=csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:'my secret',resave:false,saveUninitialized:false,store:store}));//it set the session

app.use(csrfProtection);

app.use((req,res,next)=>{
  if(!req.session.user){
    return next();//return next such that aage ka code is middleware m exicute na ho
  }
  User.findById(req.session.user._id)
    .then(user=>{
        req.user=user;
        next();
      })
    .catch(err=>console.log(err));
})

app.use((req,res,next)=>{
  res.locals.isAuthenticated=req.session.isLoggedIn;
  res.locals.csrfToken=req.csrfToken()
  next();
})
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    MONGODB_URI
  )
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
