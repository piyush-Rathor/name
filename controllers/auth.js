const bcrypt=require('bcryptjs');
// it is 3rd party package to check password
const nodemailer=require('nodemailer');//import nodemailer to send mails to varify

const sendgridTransport=require('nodemailer-sendgrid-transport');//send Webside using for mail sending

const User = require("../models/user");

const transporter=nodemailer.createTransport(//transporter bnaya using nodemailer 
  sendgridTransport({//specifie kiya k senggrid ka hi use kar rhe h 
    auth:{
      api_key:'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'//api key genrated y shoaib sir account  
    }
  }));

exports.getLogin=(req,res,next)=>{
  let message = req.flash('error');//ye tak k liye jab user postLogin se redirect kiya ja rha ho usse email ya password galat dal diya ho uske liye
  if (message.length > 0) {
    message = message[0];
  } else {//or ye else case uske liye jab user sidhe get Login p aaya ho 
    message = null;
  }
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: message//jab pahali bar aayega user get Login p to uske pas mesage m null hoga
  });
};

exports.postLogin=(req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;
    User.findOne({ email: email })//FindOne method provided y mongoose ye seach karega sare users m k wo exist kar rha k ni user
    .then(user => {
      if (!user) {//agar user exist ni kar rha matlab user ne kuch galat dal diya usko massage de diya jaye uske liye 
        req.flash('error','Invalid email or password');
        return res.redirect('/login');
      }
      bcrypt
        .compare(password, user.password)//yha p chek h rha h password sahi h k na 
        .then(doMatch => {
          if (doMatch) {//agar match kar gya 
            req.session.isLoggedIn = true;
            req.session.user = user;//yha p jo session vanega wo user b content karega ans well is Loggedin b true rakhega q k user inter kiya h na 
            return req.session.save(err => {//to session ko save kar do
              console.log(err);
              res.redirect('/');
            });
          }
          res.redirect('/login');//agar match na kiya to ...redirect n c massage
        })
        .catch(err => {
          console.log(err);
          res.redirect('/login');
        });
    })
    .catch(err => console.log(err));
};

exports.postLogout=(req,res,next)=>{
    req.session.destroy((err)=>{//logout matlab session uda do
        res.redirect('/');
    })
}

exports.getSignup=(req,res,next)=>{
  let message = req.flash('error');//wahi upar jesa ratta h agar sidhe aaya to page serve kar do
  if (message.length > 0) {//agar input galat dal k massage so kar do
    message = message[0];
  } else {
    message = null;
  }
    res.render('auth/sigup',{
        path:'/signup',
        pageTitle:'Signup',
        errorMessage: message
    });
}

exports.postSignup=(req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;
    const confirmPassword=req.body.confirmPassword;
    User.findOne({ email: email })//Agar user mile
    .then(userDoc => {
      if (userDoc) {//Matlab pahale se exist kar rha user
        req.flash('error','E-Mail allready Exist pls Pick a diff one');
        return res.redirect('/signup');
      }//Agar na matlab new h user
      return bcrypt
        .hash(password, 12)//ab es password ko hashed password m convert kiya than save kiya 
        .then(hashedPassword => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] }
          });
          return user.save();
        })
        .then(result => {
          res.redirect('/login');//hamane mail bad m send kiya pahale redirect kar diya performance k liye 
          console.log("Your Mail is Sending...");
          return transporter.sendMail({
            to:email,
            from:'abhisheksirohi19@gmail.com',
            subject:'Signup succeeded',
            html:'<h1>You sucsessfully Sighedup</h1>'
          }) ;
          }).catch(err=>{
            console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
};

//here this session is saved in memory and memory is limited or u thougents or one hundred thoagent requests so u can not manage your memory 
//so now v r going to save session in database