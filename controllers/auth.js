const user = require("../models/user");

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
//here this session is saved in memory and memory is limited or u thougents or one hundred thoagent requests so u can not manage your memory 
//so now v r going to save session in database