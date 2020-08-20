const User = require("../models/user");

const bcrypt=require('bcryptjs');

exports.getLogin=(req,res,next)=>{
    res.render('auth/login',{
        path:'/login',
        pageTitle:'Login',
        isAuthenticated:false
    });
};

exports.postLogin=(req,res,next)=>{
    user.findById('5f2c3d95e8e0171016209c61')
    .then(user=>{
        req.session.isLoggedIn=true;
        req.session.user=user;
    res.redirect('/');
    })
    .catch(err=>console.log(err));
};

exports.postLogout=(req,res,next)=>{
    req.session.destroy((err)=>{
        res.redirect('/');
    })
}

exports.getSignup=(req,res,next)=>{
    res.render('auth/sigup',{
        path:'/signup',
        pageTitle:'Signup',
        isAuthenticated:false
    });
}

exports.postSignup=(req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;
    const confirmPassword=req.body.confirmPassword;
    User.findOne({email:email}).then(userDoc=>{
        if(userDoc){
            return res.redirect('/signup');
        }
        return bcrypt.hash(password,12)
    }).then(hashedpassword=>{
        const user=new User({
        email:email,
        password:hashedpassword,
        cart:{items:[]}
    });
    return user.save();
}).then(result=>{
        res.redirect('/login');
    }).catch(err=>console.log(err));
};
//here this session is saved in memory and memory is limited or u thougents or one hundred thoagent requests so u can not manage your memory 
//so now v r going to save session in database