const path = require('path');//path directry ye use hoti h path set karane m yha p ye use ho rhi h css ka path add karane m

const express = require('express');//express require kiya
const bodyParser = require('body-parser');//ye data ko parse karane m kam aata h 
const mongoose = require('mongoose');//mongoose require kiya
const session=require('express-session');//session require kiya
const mongoDBStore=require('connect-mongodb-session')(session);//ye ek constructer return karega jisase ham apna obj bnaenge
const csrf=require('csurf');//ye csrf attacks se bachanek liye h 
const flash=require('connect-flash');//ye error massage display karane k liye h 

const errorController = require('./controllers/error');//ek controller h eska use karenge ham jab user koi wrong url ko require karega 
const User = require('./models/user');//User model require kiya wha se export kiya gya h userschema and us schema k kuch fx

MONGODB_URI='mongodb+srv://Piyush123:Piyush123@cluster0.v594s.mongodb.net/shop?retryWrites=true&w=majority';//a Permanent constant url h apne database ka
//Permanent const ko ham capital letter m assine karate h
const app = express();//app create kiya express module ko as a fx run karake 
const store=new mongoDBStore({//object bnaya apne database se connect karane k liye 
  uri:MONGODB_URI,//url diya apne database ka 
  collection:'Session'//collection jha tum apne database m session store karoge nam diya h database m
})

const csrfProtection=csrf();//csrf ko fx run kiya ab esko session k bad use karenge

app.set('view engine', 'ejs');//ejs ka engine use ho rha h ye btaya 
app.set('views', 'views');//folder btaya k apne ejs ki files eske andar rakhi h pahala views represent kar rha h k ham ejs ki location de rhe h and dusara folder ka nam

const adminRoutes = require('./routes/admin');//Apne router assine kiye jo ham according to req (of url) render karenge
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');


app.use(bodyParser.urlencoded({ extended: false }));//use kiya h body-Parser
app.use(express.static(path.join(__dirname, 'public')));//ye hamane css k path ko add kiya

app.use(session({secret:'my secret',resave:false,saveUninitialized:false,store:store}));//it set the session
//secret is a massage basically ye ek lambi c string hoti h uses m but hamane abhi ye hi likha,resave false ka mtlb h k har code run ho koi new save na ho,store ka matlab ham database ka path vagera de rhe collection ban jaega esse 
app.use(csrfProtection);//use kiya csrf protection ko
app.use(flash());//flash ko use kiya ab ham ese apne controllers m handle karenge

app.use((req,res,next)=>{
  if(!req.session.user){//agar user ne login ni kiya h  
    return next();//return next such that aage ka code is middleware m exicute na ho
  }
  User.findById(req.session.user._id)//or agar user ka session login wala h to user ko req.user m asin kar kar do
    .then(user=>{
        req.user=user;
        next();
      })
    .catch(err=>console.log(err));
})

app.use((req,res,next)=>{
  res.locals.isAuthenticated=req.session.isLoggedIn;//session se pata kiya user login wala h ya na
  res.locals.csrfToken=req.csrfToken()//csrf token liya
  next();
})
app.use('/admin', adminRoutes);//roters use kiye
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);//error wala controller use kiya(agar require usrl exist na karata ho to)

mongoose
  .connect(
    MONGODB_URI
  )//mongoose database connect ho jaye 
  .then(result => {//than tab hi server on ho
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
