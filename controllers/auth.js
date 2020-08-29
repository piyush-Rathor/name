const bcrypt=require('bcryptjs');
// it is 3rd party package to check password
const {validationResult}=require('express-validator/check');
const crypto=require('crypto');

const nodemailer=require('nodemailer');//import nodemailer to send mails to varify

const User = require("../models/user");

const transporter=nodemailer.createTransport({//transporter bnaya using nodemailer 
  service:'gmail',
  auth:{
    user:'psrathor16072000@gmail.com',
    pass:'Piyush@123'
  }
  });


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
    errorMessage: message,//jab pahali bar aayega user get Login p to uske pas mesage m null hoga
    oldInput:{
      email:'',
      password:''
    },
    validationErrors:[]
  });
};

exports.postLogin=(req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;

    const errors=validationResult(req);
    if(!errors.isEmpty()){//Agar Aaayi validation m uske liye h ye
      return res.status(422).render('auth/login',{
        path:'/login',
        pageTitle:'Login',
        errorMessage:errors.array()[0].msg,
        oldInput:{email:email,password:password},
        validationErrors:errors.array()
      })
    }

    User.findOne({ email: email })//FindOne method provided y mongoose ye seach karega sare users m k wo exist kar rha k ni user
    .then(user => {
      if (!user) {//agar user exist ni kar rha matlab user ne kuch galat dal diya usko massage de diya jaye uske liye 
        return res.status(422).render('auth/login',{
          path:'/login',
          pageTitle:'Login',
          errorMessage:'Invalid email or password',
          oldInput:{email:email,password:password},
          validationErrors:[]
        })
      }
      bcrypt
        .compare(password, user.password)//yha p chek h rha h password sahi h k na 
        .then(doMatch => {
          if (doMatch) {//agar match kar gya 
            req.session.isLoggedIn = true;
            req.session.user = user;//yha p jo session vanega wo user b content karega ans well is Loggedin b true rakhega q k user inter kiya h na 
            return req.session.save(err => {//to session ko save kar do
              res.redirect('/');
            });
          }
          return res.status(422).render('auth/login',{
            path:'/login',
            pageTitle:'Login',
            errorMessage:'Invalid email or password',
            oldInput:{email:email,password:password},
            validationErrors:[]
          })        })
        .catch(err => {
          return next(err);
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
        errorMessage: message,
        oldInput:{email:'',password:'',confirmPassword:''},
        validationErrors:[]
    });
}

exports.postSignup=(req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;
    const confirmPassword=req.body.confirmPassword;
    const errors=validationResult(req);
    if(!errors.isEmpty()){//Agar Aaayi validation m uske liye h ye
      return res.status(422).render('auth/sigup',{
        path:'/signup',
        pageTitle:'Signup',
        errorMessage:errors.array()[0].msg,
        oldInput:{email:email,password:password,confirmPassword:confirmPassword},
        validationErrors:errors.array()
      })
    }
       bcrypt
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
          var mailOptions={
            from:'psrathor16072000@gmail.com',
            to:email,
            subject:'Sending Email Using Gmail',
            html:`
            <p>hey dude</p>
            <h1>This is Tryle Webside ....</h1>
            `}
          return  transporter.sendMail(mailOptions,function(error,info){
            if(error){
              console.log(error);
            }
            else{
              console.log('Email Sent:'+info.response);
            }
          }) ;
          }).catch(err=>{
            console.log(err);
        });
};

exports.getReset=(req,res,next)=>{
  let message = req.flash('error');//ye tak k liye jab user postLogin se redirect kiya ja rha ho usse email ya password galat dal diya ho uske liye
  if (message.length > 0) {
    message = message[0];
  } else {//or ye else case uske liye jab user sidhe get Login p aaya ho 
    message = null;
  }
  res.render('auth/reset', {
    path: '/reset',
    pageTitle: 'Reset Password',
    errorMessage: message//jab pahali bar aayega user get Login p to uske pas mesage m null hoga
  });
}

exports.postReset=(req,res,next)=>{
  crypto.randomBytes(32,(err,buffer)=>{
    if(err){
      return res.redirect("/reset");
    }
    const token=buffer.toString('hex');
    User.findOne({email:req.body.email}).then(user=>{
      if(!user){
        req.flash('error','No account with that eamail Found.');
        return res.redirect('/reset');
      }
      user.resetToken=token;
      user.resetTokenExpiration=Date.now()+3600000;
      return user.save();
    }).then(result=>{
      res.redirect('/');
      var mailOptions={
        from:'psrathor16072000@gmail.com',
        to:req.body.email,
        subject:'Sending Email Using Gmail',
        html:`
        <p>You are requested to a password!!!</p>
        <h1>click This <a href="http://localhost:3000/reset/${token}">link</a>to set new Password<h1>
        `}
      transporter.sendMail(mailOptions,function(error,info){
        if(error){
          console.log(error);
        }
        else{
          console.log('Email Sent:'+info.response);
        }
      })
    }).catch(err=>{
      console.log(err);
    })
  })
};

exports.getNewPassword=(req,res,next)=>{
  const token=req.params.token;
  User.findOne({resetToken:token})//yha date wala system work na kar rha pata na q...esliye hata h/....,{$gt:Date.now()}ye tha comma m ek or condition thi 
  .then(user=>{
  let message = req.flash('error');//ye tak k liye jab user postLogin se redirect kiya ja rha ho usse email ya password galat dal diya ho uske liye
  if (message.length > 0) {
    message = message[0];
  } else {//or ye else case uske liye jab user sidhe get Login p aaya ho 
    message = null;
  }
  res.render('auth/new-password', {
    path: '/new-password',
    pageTitle: 'New Password',
    errorMessage: message,//jab pahali bar aayega user get Login p to uske pas mesage m null hoga
    userId:user._id.toString(),
    passwordToken:token
  });
}).catch(err=>{console.log(err)});
}

exports.postNewPassword=(req,res,next)=>{
  const NewPassword=req.body.password;
  const userId=req.body.userId;
  const passwordToken=req.body.passwordToken;
  let resetUser;
  User.findOne({
    resetToken:passwordToken,
    // resetTokenExpiration:{$gt:Date.now()},//Pata na kuch dikkat reset date m compare na kar rha
    _id:userId
  }).then(user=>{
    resetUser=user;
    return bcrypt.hash(NewPassword,12)
  }).then(hashedPassword=>{
    resetUser.password=hashedPassword;
    resetUser.resetToken=undefined;
    // resetTokenExpiration=undefined;
    return resetUser.save();
  }).then(result=>{
    res.redirect('/login');
  }).catch(err=>{
    console.log(err);
  })
}

//here this session is saved in memory and memory is limited or u thougents or one hundred thoagent requests so u can not manage your memory 
//so now v r going to save session in database