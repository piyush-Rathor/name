const express=require('express');

const User=require('../models/user.js');

const {check,body}=require('express-validator/check');//ek specific file nikali express validater m se usko check name k fx m assine kar liya
//basically hamane 2 fx nikale h check and check 3rd party se check check chake karata sab jagah params m body cookie m 
const authController=require('../controllers/auth');//controller asine kiya

const router=express.Router();

router.get('/login',authController.getLogin);

router.post('/login',
[check('email').isEmail().withMessage('Please Enter a Valid Email..').normalizeEmail(),body('password')//validation for password 
.isLength({ min: 8 }).withMessage('Password Should Cantain at least 8 Characters').trim()
.matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,
      ).withMessage("Password sounld content al least Capitol letter One Small Latter and a special Charrecter")],
authController.postLogin);

router.post('/logout',authController.postLogout);

router.get('/signup',authController.getSignup);

router.post('/signup',
[check('email').isEmail().normalizeEmail().withMessage('Please Enter a Valid Email..')//give Validation using express-validater 3rd party package
.custom((value,{req})=>{//Hamara Custom h method bas ye examine kiya h k kese perticular method bnate h 
  return User.findOne({email:value}).then(userDoc=>{//resiving in userdoc jo return karega 
    if(userDoc){
      return Promise.reject('Email exist allready,Please pick a diff one');
    }
  });
  // if(value==='psrathor16072000@gmail.com'){
  //   throw new Error("This is Dovloper Email its cant be use");
  // }
  // return true;
}).normalizeEmail(),body('password')//validation for password 
.isLength({ min: 8 }).withMessage('Password Should Cantain at least 8 Characters').trim()
.matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,
      ).withMessage("Password sounld content al least Capitol letter One Small Latter and a special Charrecter"),
    body('confirmPassword').trim().custom((value,{req})=>{//for confirm password
      if(value!==req.body.password){
        throw new Error("PassWord have to Match");
      }
    return true;
  })

]
,authController.postSignup);

router.get('/reset',authController.getReset);

router.post('/reset',authController.postReset);

router.get('/reset/:token',authController.getNewPassword);

router.post('/new-password',authController.postNewPassword);

module.exports=router;