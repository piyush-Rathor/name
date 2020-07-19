//ye file require ki gyi h modules k product.js m or 
const Sequelize=require('sequelize');

const sequelize=new Sequelize('node-complete','root','Piyush@123',{
    dialect:'mysql',
    host:'localhost'
});
module.exports=sequelize;
//ye code jab server on (ya sab sync call hoga tab chalega )
//esme jo code h wo ye h k mysql database , jake chek karo k koi schema h jiska nam node complete ho 
//fir hamanw usko root btaya password diya dialect se ye braya k mysql hi h 
//n fir ham usko export kar diye h jo ham ese dusari jagah se b call kar sake 