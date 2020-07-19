//Ye file require ki gyi h shop.js jo ki controllers m h
const fs = require('fs');//fs file ko require kiya 
const path = require('path');//path ko require kiya  

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);//Set kiya path variable m store kiya 

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // Fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      // Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex(//agar hamare cart m koi product hoga to usse ham prod likalenge
        prod => prod.id === id//Match karaenge 
      );
      const existingProduct = cart.products[existingProductIndex];//id wale m aa jane k bad usko ham ek specific variable m store kar lenge
      let updatedProduct;
      // Add new product/ increase quantity
      if (existingProduct) {//esa b to ho sakata h na k file existhi na kar rahi ho/matlab banda pahala item put kar rha ho
        updatedProduct = { ...existingProduct };//this is next gen js code ..pra ka arr/string sab copy kar dega 
        updatedProduct.qty = updatedProduct.qty + 1;//Modification kiya
        cart.products = [...cart.products];//ye simple agr cart.product update to samane wale m update na ho
        cart.products[existingProductIndex] = updatedProduct;//update kar diya 
      } else {//agar product pahale se ho hi na to 
        updatedProduct = { id: id, qty: 1 };//na h to new pass karenge 
        cart.products = [...cart.products, updatedProduct];
        //dono ki combine kar lena basically yha ...spread oprater laga hua h jisaka kam hota h k jisame ... h 
        //agar usko update kiya jaye to wo update uske samane wale m na ho jab ki jisame three dot 
        //ni laga h usme agar update kiya jaye to samane wale m updatae ho jaega
        // basically jab ham objects m kam karate h tab hame ... k sath {}ka use karana hota h 
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), err => {
        console.log(err);
      });
    });
  }
};
