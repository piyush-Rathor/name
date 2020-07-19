// Ye file import ki gyi gyi app.js m usme eska exicution hoga
exports.get404 = (req, res, next) => {//hamane get 404 pure ka ek tarah sename likh liya jise ham send kar rhe h app.js
  res.status(404).render('404', { pageTitle: 'Page Not Found', path: '/404' });//yha p 404 file send kar rhe h views m h
};
/*url m user ne koi galat url dal diya */
