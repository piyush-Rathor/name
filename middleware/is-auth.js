module.exports=(req,res,next)=>{//ab ye midlleware har ek route p chalaya jaega ...
    if(!req.session.isLoggedIn){//eska  kam h chek karana user login wala h ya na 
        return res.redirect('/login');
    }
    next();
}