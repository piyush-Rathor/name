const http =require('http');
// a file system wich is used to create a server
const server = http.createServer((req,res)=>{
    //creat,s a server n call a nameless fx 
    console.log(req.url ,req.method,req.headers);
    //Some method 
    //process.exit;
});
server.listen(3000);// Listen on a perticular Port

