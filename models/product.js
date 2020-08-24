const mongoose = require('mongoose');//mongoose ki madad se schema bna rheh na to mongoose require kiya 

const Schema = mongoose.Schema;//constructure liya

const productSchema = new Schema({//declayer kar diya schema ka type matlab esi esi imfomation 
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);
