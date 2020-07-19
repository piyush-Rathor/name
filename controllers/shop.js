//Ye file require ki gyi h shop.js m jo ki routers m h 
const Product = require('../models/product');//Ye file b product file ko import kar rahi h
//har export m ek fx bnaya h usko var m assine m karake export kar diya with argument jo jo jarurat h
const Cart=require('../models/cart.js');//require kiya file ko 
exports.getProducts = (req,res, next) => {
  Product.findAll()//It is calling findAll fx which is in product file in moduls folder
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
  Product.findAll({where:{id:prodId}}).
  then(products=>{
    res.render('shop/product-detail',{
      product:products[0],//q k ham product.dateail page m ek hi product ko require kar rhe h to hame ek hi send karana padega
      pageTitle:products[0].title,//wese ye jo productsh na usme ek ek hi eliment h bas array form m h use hamane eliment m convert kiya
      path:'products'
    });
  }).catch(err=>console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.findAll().then(product=>{//It is calling findAll fx which is in product file in moduls folder
      res.render('shop/index',{//database se do aray aayenge hamane examle m dekha tha esliye hi hamane allready array se output liya k eliment hi aye
        prods:product,
        pageTitle:'shop',
        path:'/'
      });
    })                        //esme sab wahi files use ki gyi nh jo admin m use ki gyi with diffrent name .... 
    .catch(err=>console.log(err));
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

exports.postCart = (req, res, next) => {
  const prodId=req.body.productId;
  Product.findByPk(prodId,(product)=>{
    Cart.addProduct(prodId,product.price);//Ye function cart.js m likha hua h jo ki module folder m h 
  });
  res.redirect('/cart'); //
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};