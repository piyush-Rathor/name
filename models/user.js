const mongoose = require('mongoose');
// const product = require('./product');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cart: {
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true }
      }
    ]
  }
});
userSchema.methods.addToCart=function(product){//ye method call kiya gya h shop.js controllers m postCart m (postCart controller m )
  const cartProductIndex=this.cart.items
  .findIndex(cp=>{//es cp m ek ek kar k har product aata rhega "Findindex method return karata h First index under the given condition"
    return cp.productId.toString()===product._id.toString();//condition h
  });
  let newQuantity=1;//Agar product cart m new h to new QQuantity 1 hogi na 
  const updatedCartItems=[...this.cart.items];//cart hame updatekarana h  na to purana cart le liya 
  if(cartProductIndex>=0){//chek kiya Product h ya ni cart m 
   newQuantity=this.cart.items[cartProductIndex].quantity+1;//Agar Product h Pahale se cart m to uski quantity bada di 
   updatedCartItems[cartProductIndex].quantity=newQuantity;//us perticular item ki quantity ko assine kar diya
  }
  else{//Agar product new h 
    updatedCartItems.push({//to push kar diya new eliment 
      productId:product._id,//uski quantity or id pass kar di
      quantity:newQuantity
    });
  }
  const UpdatedCart={//bas ab items le liye
    items:updatedCartItems
  };
  this.cart=UpdatedCart;//and asine kar diya 
  return this.save();//usko save kar diya 
};

userSchema.methods.removeFromCart=function(productId){
  const updatedCartItems=this.cart.items.filter(item=>{//filter method pura k pura eliment wapas karata h under a given condition
    return item.productId.toString()!==productId.toString();//delete wala eliment nikal diya 
  });
  this.cart.items=updatedCartItems;//assine kar diya 
  return this.save();//save kar diya 
};

userSchema.methods.clearCart=function(){
  this.cart={item:[]};
  return this.save();
}

module.exports = mongoose.model('User', userSchema);
