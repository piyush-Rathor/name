//Ye file require ki gyi h shop.js m jo ki routers m h 
const Product = require('../models/product');//Ye file b product file ko import kar rahi h
//har export m ek fx bnaya h usko var m assine m karake export kar diya with argument jo jo jarurat h
// const Cart=require('../models/cart.js');//require kiya file ko 
// const Order = require('../models/order');
exports.getProducts = (req,res, next) => {
  // product=new Product()
  Product.fetchAll()//It is calling findAll fx which is in product file in moduls folder
  .then(products=>{//database se do aray aayenge hamane examle m dekha tha esliye hi hamane allready array se output liya k eliment hi aye
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products',
      });
  })
  .catch(err=>console.log(err));
};
// exports.getProduct=(req,res,next)=>{//Ye rout hamane hamape : wale se requir kiya h
//   const prodId=req.params.productId;//Here hamane wo save kiya prodId m
//   Product.findAll({where:{id:prodId}}).
//   then(products=>{
//     res.render('shop/product-detail',{
//       product:products[0],//q k ham product.dateail page m ek hi product ko require kar rhe h to hame ek hi send karana padega
//       pageTitle:products[0].title,//wese ye jo productsh na usme ek ek hi eliment h bas array form m h use hamane eliment m convert kiya
//       path:'products'
//     });
//   }).catch(err=>console.log(err));
// };

exports.getIndex = (req, res, next) => {
  Product.fetchAll().then(product=>{//It is calling findAll fx which is in product file in moduls folder
      res.render('shop/index',{//database se do aray aayenge hamane examle m dekha tha esliye hi hamane allready array se output liya k eliment hi aye
        prods:product,
        pageTitle:'shop',
        path:'/'
      });
    })                        //esme sab wahi files use ki gyi nh jo admin m use ki gyi with diffrent name .... 
    .catch(err=>console.log(err));
};

// exports.getCart = (req, res, next) => {
//   req.user.getCart()
//   .then(cart=>{
//     return cart.getProducts()
//     .then(products=>{
//       res.render('shop/cart',{
//         path:'/cart',
//         pageTitle:'Your Cart',
//         products:products
//       });
//     })
//     .catch(err=>{console.log(err)});
//   }).catch(err=>{console.log(err)});
// };

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId).then(product=>{
    return req.user.addToCart(product._id);
  }).then(result=>{
    console.log(result);
  });
  // let fetchedCart;
  // let newQuantity = 1;
  // req.user
  //   .getCart()
  //   .then(cart => {
  //     fetchedCart = cart;
  //     return cart.getProducts({ where: { id: prodId } });
  //   })
  //   .then(products => {
  //     let product;
  //     if (products.length > 0) {
  //       product = products[0];
  //     }

  //     if (product) {
  //       const oldQuantity = product.cartItem.quantity;
  //       newQuantity = oldQuantity + 1;
  //       return product;
  //     }//ya to upar wala product return hoga ya niche wala,
  //     //Uparwala Product Tab return Hoga jab pahale se item (product) cart m hoga tab uski quantity bada k hogega return
  //     return Product.findByPk(prodId);//Agar product pahali bar cart m jaega tab ye hoga return
  //   })
  //   .then(product => {
  //     return fetchedCart.addProduct(product, {
  //       through: { quantity: newQuantity }
  //     });
  //   })
  //   .then(() => {
  //     res.redirect('/cart');
  //   })
  //   .catch(err => console.log(err));
};

// exports.postCartDeleteProduct=(req,res,next)=>{
//   const prodId=req.body.productId;
//   req.user.getCart().then(cart=>{
//     return cart.getProducts({where:{id:prodId}});

//     })
//     .then(products=>{
//       const product=products[0];
//       return product.cartItem.destroy();//destroy is a fx of sequelize
//     }).then(result=>{
//       res.redirect('/cart');
//     })
//     .catch(err=>console.log(err));
// }

// exports.getOrders = (req, res, next) => {
//   req.user
//     .getOrders({include: ['products']})//include product is also a tric ko sequilize 
//     .then(orders => {
//       res.render('shop/orders', {
//         path: '/orders',
//         pageTitle: 'Your Orders',
//         orders: orders
//       });
//     })
//     .catch(err => console.log(err));
// };

// exports.postOrder=(req,res,next)=>{
//   let fetchedCart;
// req.user.getCart()
// .then(cart=>{
//   fetchedCart=cart;
//   return cart.getProducts();
// }).then(products=>{
//   return req.user.createOrder()
//   .then(Order=>{
//     Order.addProducts(products.map(product=>{
//       product.orderItem={quantity:product.cartItem.quantity};
//       return product;})
//       );

//   }).catch(err=>console.log(err));
// }).then(result=>{
//   return fetchedCart.setProducts(null);
// }).then(result=>{
//   res.redirect('./orders');
// })
// };
// exports.getCheckout = (req, res, next) => {
//   res.render('shop/checkout', {
//     path: '/checkout',
//     pageTitle: 'Checkout'
//   });
// };