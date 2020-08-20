exports.getLogin=(req,res,next)=>{
    console.log(req.session.isLoggedIn);
    res.render('auth/login',{
        path:'/login',
        pageTitle:'Login',
        isAuthenticated:false
    });
};

exports.postLogin=(req,res,next)=>{
    req.session.isLoggedIn=true;
    res.redirect('/');
};
//here this session is saved in memory and memory is limited or u thougents or one hundred thoagent requests so u can not manage your memory 
//so now v r going to save session in database