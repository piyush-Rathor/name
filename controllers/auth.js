exports.getLogin=(req,res,next)=>{
    const isLoggedIn=req.get('Cookie')
   .split('=')[1]==='true';//simply check kiya k jo cookie bnayi hogi pahale wo h ki ni 
    res.render("auth/login",{//ye bahut simple h but esme ese user modifie kar skata h esse apke data ka nuksan ho jaega
        path:'/login',
        pageTitle:'Login',
        isAuthenticated:isLoggedIn//simpply true or false return kiya
    });
};
exports.postLogin=(req,res,next)=>{
    res.setHeader('set-cookie','loggedIn=true');//Cokkie set ki end ek value di h and chck kar lenge agar cookie hogi user k browser p to ye authenticated h 
    res.redirect('/');//redirect kar diya bas 
}