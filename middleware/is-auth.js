module.exports=(req,res,next)=>{//ab ye midlleware har ek route p chalaya jaega ...
    if(!req.session.isLoggedIn){
        return res.redirect('/login');
    }
    next();
}