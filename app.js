const path = require('path');//path directry ye use hoti h path set karane m yha p ye use ho rhi h css ka path add karane m

const express = require('express');//express require kiya
const bodyParser = require('body-parser');//ye data ko parse karane m kam aata h 
const mongoose = require('mongoose');//mongoose require kiya
const session=require('express-session');//session require kiya
const mongoDBStore=require('connect-mongodb-session')(session);//ye ek constructer return karega jisase ham apna obj bnaenge
const csrf=require('csurf');//ye csrf attacks se bachanek liye h 
const flash=require('connect-flash');//ye error massage display karane k liye h 
const multer=require('multer');//

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

const fileStorage=multer.diskStorage({//multer package ka use karake destination matlab kha save karana h set kar rhe h and name set kar rhe h
  destination:(req,file,cb)=>{
    cb(null,'images');
  },
  filename:(req,file,cb)=>{
    cb(null,new Date().toISOString()+'-'+file.originalname)//name diya h date se related
  }
})

const fileFilter=(req,file,cb)=>{//fileFilter set kiya h hame es es type ki file hi keval accept karani h
  if(file.mimetype=='image/jpg' || file.mimetype==='image/png' ||  file.mimetype==='image/jpeg'){
    cb(null,true);
  }else{
    cb(null,false);
  }
}

app.set('view engine', 'ejs');//ejs ka engine use ho rha h ye btaya 
app.set('views', 'views');//folder btaya k apne ejs ki files eske andar rakhi h pahala views represent kar rha h k ham ejs ki location de rhe h and dusara folder ka nam

const adminRoutes = require('./routes/admin');//Apne router assine kiye jo ham according to req (of url) render karenge
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const { abort } = require('process');


app.use(bodyParser.urlencoded({ extended: false }));//use kiya h body-Parser
app.use(multer({storage:fileStorage,fileFilter:fileFilter}).single('image'));//use kiya h body-Parser(dest:images ....jo buffer m deta fatch ho rha tha image ka use binary m karake dega),FileFilter set kar rha kiskis type ki file ko accept karna h 
app.use(express.static(path.join(__dirname, 'public')));//ye hamane css k path ko add kiya
app.use('/images',express.static(path.join(__dirname, 'images')));//yw file 

app.use(session({secret:'my secret',resave:false,saveUninitialized:false,store:store}));//it set the session
//secret is a massage basically ye ek lambi c string hoti h uses m but hamane abhi ye hi likha,resave false ka mtlb h k har code run ho koi new save na ho,store ka matlab ham database ka path vagera de rhe collection ban jaega esse 
app.use(csrfProtection);//use kiya csrf protection ko
app.use(flash());//flash ko use kiya ab ham ese apne controllers m handle karenge

app.use((req,res,next)=>{
  res.locals.isAuthenticated=req.session.isLoggedIn;//session se pata kiya user login wala h ya na
  res.locals.csrfToken=req.csrfToken()//csrf token liya
  next();
});

app.use((req,res,next)=>{
  if(!req.session.user){//agar user ne login ni kiya h  
    return next();//return next such that aage ka code is middleware m exicute na ho
  }
  User.findById(req.session.user._id)//or agar user ka session login wala h to user ko req.user m asin kar kar do
    .then(user=>{
      if(!user){
        return next();
      }
        req.user=user;
        next();
      })
    .catch(err=>{
      const error=new Error(err);
      error.httpStatusCode=500;
      return next(error);
    });
})


app.use('/admin', adminRoutes);//roters use kiye
app.use(shopRoutes);
app.use(authRoutes);
app.get('/500',errorController.get500);


app.use(errorController.get404);//error wala controller use kiya(agar require usrl exist na karata ho to)
app.use((error,req,res,next)=>{
  res.status(500).render('500', { pageTitle: 'Error', path: '/500',isAuthenticated:req.session.isLoggedIn});
})
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
