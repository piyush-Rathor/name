//Ye file require ki gyi h admin.js rooutes folder m 
const Product = require('../models/product');//Ye b ek file require kar rha jiska address given h

exports.getAddProduct = (req, res, next) => {//Ek name less fx bnaya or usko export kiya with a name
  res.render('admin/edit-product', {//res.render method h jo files ko render karata or es jagah se file render karani h  or engine ko declayer wact hamane hamane views folder ka address de diya tha
    pageTitle: 'Add Product', // these variable we r passing dynamicalyy addprojuct.ejs m jake layout m 
    path: '/admin/add-product',//ye variable addproduct.ejs m jake navigater m path m jaega 
    editing:false
  });
};
// //sequelize use hua
exports.postAddProduct = (req, res, next) => {//exicute after filling Form and take the data from input texts 
  const title = req.body.title;//sare variable user se liye and variables m asine kiye and niche pass pass kar diye 
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product=new Product(title,price,description,imageUrl,null,req.user._id);
  product.save()
  .then(result=>{//matlab creates method eska eliment bnaega end than kar kar dega database m immediatly/Users/piyushrathor/Downloads/Node_js_Y_Udemy-master/data/cart.json
    //console.log(result); yar fargi m console bharata 
    console.log(result);
    res.redirect('/admin/products');
  })
  .catch(err=>console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(Product=>{//Sare k sare product uthaye database me se and file render ki n products ko send kar
    res.render('admin/products',{
      prods:Product,
      pageTitle:'Admin Products',
      path:'/admin/products'
    });
  });
};
exports.getEditProduct = (req, res, next) => {
  // console.log("kjbh");
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    // Product.findByPk(prodId)
    .then(product => {
      // console.log(product+"\n\n\n");
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      });
    })
    .catch(err => console.log(err));
};
exports.postEditProduct = (req, res, next) => {//ye tab call hoga jab ham edit ka form submit kar denge 
  const prodId = req.body.productId;//ye hamane new value req.body method se
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
    const product =new Product(
      updatedTitle,
      updatedPrice,
      updatedDesc,
      updatedImageUrl,
      prodId
    );
    product.save()
    .then(result => {
      console.log('UPDATED PRODUCT!\n\n');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));//agar error ayi to pakad lo 
};


exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;//esme b productId hiddenly ja rhi h usko leliya h uspe methors laga h
  // console.log(prodId);
  Product.deleteById(prodId).then(()=>{
    res.redirect('/admin/products');
    console.log("Deleyed Products");
  }).catch(err=>console.log(err));
};
// exports.postCartDeleteProduct=(req,res,next)=>{
//   const prodId=req.body.productId;
//   req.user.getCart(cart=>{
//     return cart.getProducts({where:{id:prodId}});
//   })
//   .then(products=>{
//     const product=products[0];
//     return product.cartItem.destroy();
//   }).then(result=>{
//     res.redirect('/cart');
//   })
//   .catch(err=>console.log(err));
// }

// /*basically controlllers m ham sari files ko ejs file ko render karte h  
// specific requarment k regArding specfic controllers ko render kar rhe h 
// */