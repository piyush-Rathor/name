const http =require('http');
// a file system wich is used to create a server
const server = http.createServer((req,res)=>{
    // Here it creat,s a server and call a nameless function..... 
    console.log(req);
     // here we r just give a console...
});
server.listen(3000);// fix a port to listen....
// Abhi google chrome p keval circle ghumega q k hamane koi responce ni diya h 
//abhi tak so wo responce ni de paega