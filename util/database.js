const mongodb=require('mongodb');
const MongoClient=mongodb.MongoClient;

var _db;

const mongoConnect=(callback)=>{
    MongoClient.connect('mongodb+srv://Piyush123:Piyush123@cluster0.v594s.mongodb.net/shop?retryWrites=true&w=majority')
    .then(client =>{
        console.log("Connected");
        _db=client.db();
        // console.log(_db);
        // console.log(getdb);
        callback();
    }).catch(err=>{
        console.log(err);
    throw err;
    });
};
const getdb = () => {
    // console.log(_db);
    if (_db) {
      return _db;
    }
    throw 'No database found!';
  };
  

// module.exports=mongoConnect;
exports.mongoConnect=mongoConnect;
exports.getdb=getdb;
// module.exports=getdb;


