const mongodb=require("mongodb");
const Product = require("./product");
const getdb=require('../util/database').getdb;
const ObjectId  = mongodb.ObjectId;

class User{
    constructor(username,email,cart,id){
        this.name=username;
        this.email=email;
        this._id=id;
    }
    save(){
        const db=getdb();
        return db.collection('users').insertOne(this);
    }
    addToCart(productId){
        const updatedCart={items:[{productId:new ObjectId(productId),quantity:1}]};
        const db=getdb();
        return db.collection('users').updateOne(
            {_id:new ObjectId(this._id)},
            {$set:{cart:updatedCart}}
        );
    }
    static findById(userId) {
        const db = getdb();
        return db
          .collection('users')
          .findOne({ _id: new ObjectId(userId) })
          .then(user => {
            return user;
          })
          .catch(err => {
            console.log(err);
          });
      }
}
module.exports=User;