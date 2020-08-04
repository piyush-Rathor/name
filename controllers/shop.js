//Ye file require ki gyi h shop.js m jo ki routers m h 
const Product = require('../models/product');
const Order=require('../models/order');
exports.getIndex = (req, res, next) => {
  Product.find().then(products=>{//It is calling findAll fx which is in product file in moduls folder
      res.render('shop/index',{//database se do aray aayenge hamane examle m dekha tha esliye hi hamane allready array se output liya k eliment hi aye
        prods:products,
        pageTitle:'shop',
        path:'/'
      });
    })                        //esme sab wahi files use ki gyi nh jo admin m use ki gyi with diffrent name .... 
    .catch(err=>console.log(err));
};

exports.getProducts = (req,res, next) => {
  Product.find()//It is calling find method which is a method of mongoose it will return all product
  .then(products=>{//database se do aray aayenge hamane examle m dekha tha esliye hi hamane allready array se output liya k eliment hi aye
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products',
      });
  })
  .catch(err=>console.log(err));
};

exports.getProduct=(req,res,next)=>{//Ye rout hamane hamape : wale se requir kiya h
  const prodId=req.params.productId;//Here hamane wo save kiya prodId m
  Product.findById(prodId).
  then(product=>{
    res.render('shop/product-detail',{
      product:product,//q k ham product.dateail page m ek hi product ko require kar rhe h to hame ek hi send karana padega
      pageTitle:product.title,//wese ye jo productsh na usme ek ek hi eliment h bas array form m h use hamane eliment m convert kiya
      path:'products'
    });
  }).catch(err=>console.log(err));
};

exports.getCart = (req, res, next) => {
  req.user
    .populate('cart.items.productId')//inner eliment ko pura uthana h ye btata h
    .execPopulate()//it is convert it into a promise
    .then(user => {
      const products = user.cart.items;//dono products utha liye
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      });
    })
    .catch(err => console.log(err));
};

exports.postCart=(req,res,next)=>{
  const prodId=req.body.productId;
  Product.findById(prodId).then(product=>{//findById is a methiod of mongoose 
    return req.user.addToCart(product);//addTo cart method hamane bnaya h ye declayer h module m user.js m
  })
  .then(result=>{
    // console.log(result);
    res.redirect('/cart');
  });
};

exports.postCartDeleteProduct=(req,res,next)=>{
  const prodId=req.body.productId;
  req.user.removeFromCart(prodId)//Mrthod Made By Us in user model
  .then(result=>{
    res.redirect('/cart');//redirect kar diya 
  })
  .catch(err=>console.log(err));
};

exports.postOrder=(req,res,next)=>{
  req.user.populate('cart.items.productId')
  .execPopulate()
  .then(user=>{
    const products=user.cart.items.map(i=>{
      return {quantity:i.quantity,product:{...i.productId._doc}}
    });
    const order=new Order({
      user:{
        name:req.user.name,
        userId:req.user._id
      },
      products:products
    });
    return order.save();
  }).then(result=>{
    return req.user.clearCart();//is function that v r created eska kam h after order cart clear karana
  }).then(result=>{
    res.redirect('/orders');
  })
  .catch(err=>{
    console.log(err);
  })
};

exports.getOrders = (req, res, next) => {
  Order.find({ 'user.userId': req.user._id })//filter lagaya h keva; wahi jisaki id match kare
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(err => console.log(err));
};