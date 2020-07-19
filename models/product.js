const Sequelize = require('sequelize');

const sequelize = require('../util/database');//require kiya se wo schemas se connect kar diya h unhone  

const Product = sequelize.define('product', {//define method use kar rhe h ham us file p upar wali small s wale sequilize p database create kiya 
  id: {//feild h database k liye 
    type: Sequelize.INTEGER,//Type vagera define kiya h jo ki Sequize ka method h
    autoIncrement: true,//kuch chije filter ki h
    allowNull: false,
    primaryKey: true
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Product;//export kiya h 
