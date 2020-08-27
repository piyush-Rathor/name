exports.get404 = (req, res, next) => {//ye tab render jab url vagera na milega pure project m
  res.status(404).render('404', { pageTitle: 'Page Not Found', path: '/404' ,isAutheticated:req.session.isLoggedIn});
};
exports.get500 = (req, res, next) => {//ye tab render jab url vagera na milega pure project m
  res.status(500).render('500', { pageTitle: 'Error', path: '/500',isAutheticated:req.session.isLoggedIn });
};

