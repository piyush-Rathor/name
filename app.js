const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session=require('express-session');
const mongoDBStore=require('connect-mongodb-session')(session);//ye ek constructer return karega

const errorController = require('./controllers/error');
const User = require('./models/user');

MONGODB_URI='mongodb+srv://Piyush123:Piyush123@cluster0.v594s.mongodb.net/shop?retryWrites=true&w=majority';

const app = express();
const store=new mongoDBStore({
  uri:MONGODB_URI,
  collection:'Session'//collection jha tum apne database m session store karoge nam diya h database m
})

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:'my secret',resave:false,saveUninitialized:false,store:store}));//it set the session

app.use((req, res, next) => {
  User.findById('5f2c3d95e8e0171016209c61')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    MONGODB_URI
  )
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Max',
          email: 'max@test.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
