//Ye file require ki gyi h admin.js rooutes folder m 
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {//res.render method h jo files ko render karata or es jagah se file render karani h  or engine ko declayer wact hamane hamane views folder ka address de diya tha
    pageTitle: 'Add Product', // these variable we r passing dynamicalyy addprojuct.ejs m jake layout m 
    path: '/admin/add-product',//ye variable addproduct.ejs m jake navigater m path m jaega 
    editing:false//Actully Ham ek hi page ko do jagah render kar rhe h ye usme use hua eske base p hi hamane pata lagay h kon sa page h
  });
};
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title; //ye ek method h jisase ham boxes k andar se data utha sakate h
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product=new Product({
    title:title,
    price:price,
    description:description,
    imageUrl:imageUrl,
    userId:req.user//according to max if v wrote req.user mongoose will automatically tae id but in practical ye ni hua
});
  product.save()//save method mongoose ka h 
  .then(result=>{
    console.log('Created Product');
    res.redirect('/admin/products');
  })
  .catch(err=>console.log(err));
};
exports.getProducts = (req, res, next) => {
  Product.find()//find method mongoose ka h ye sare eliment lota deta agar ham filter lagaenge to selective lotaega
  .then(Products=>{
    res.render('admin/products',{
      prods:Products,
      pageTitle:'Admin Products',
      path:'/admin/products'
    });
  });
};
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;//basically ham ek hi page do jagah render kar rhe h to uska chek kar rhe h chek kar rhe h edit mod h ka na 
  if (!editMode) {//agar na  h to chal bhaiya yha se
    return res.redirect('/');//redirect kar diya n return ka matlab ye h k aage ka code na chale
  }
  const prodId = req.params.productId;//fetch ki id from web page 
  Product.findById(prodId)//product uthaya
    .then(product => {//product nam k var m store kiya us priticular product ko jisako edit karana h 
      if (!product) {
        return res.redirect('/');//redirect kar diya n return ka matlab ye h k aage ka code na chale
      }
      res.render('admin/edit-product', {//bas page send kar diya
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
   Product.findById(prodId).then(product=>{//findById method se perticular product uthaya ("findById method mongoose ka h hamane bnaya ni h")
     product.title=updatedTitle;//sab value ko update kiya....
     product.description=updatedDesc;
     product.imageUrl=updatedImageUrl;
     product.price=updatedPrice;
    product.save();//Save method mongoose ka predifine method h hamane bnaya ni h 
    return res.redirect('/admin/products');//return lagane se redirect aage ka code exicute ni hoga..jese yha console ni hoga
    console.log("\n\n\ndfgfgds");//ye code exixute hi ni hoga agar redirect m return hata de chalega 

   })
    .catch(err => console.log(err));//agar error ayi to pakad lo 
};
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;//esme b productId hiddenly ja rhi h usko leliya h uspe methors laga h
  // console.log(prodId);
  Product.findByIdAndRemove(prodId).then(()=>{//FindByIdAndRemove method b mongoose ka h eska kam h id lena uski bas del kar dega
    console.log("Deleyed Products");
    res.redirect('/admin/products');
  }).catch(err=>console.log(err));
};


// /*basically controlllers m ham sari files ko ejs file ko render karte h  
// specific requarment k regArding specfic controllers ko render kar rhe h 
// */