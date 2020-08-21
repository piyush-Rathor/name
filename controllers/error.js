exports.get404 = (req, res, next) => {//ye tab render jab url vagera na milega pure project m
  res.status(404).render('404', { pageTitle: 'Page Not Found', path: '/404' ,
  isAuthenticated:isLoggedIn});
};
