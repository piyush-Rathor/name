const http=require('http');
const server=http.createServer((req,res)=>{
    res.setHeader('Content-type','text/html');
    // It creat,s Header n add in responce it is give information wich type of content we have n it is said text/html type
    res.write('<html><head><title>hey</title></head><body><h1>hey guys</h1></body></html>');
    //writing something on the page
    res.end();
    // for showing here responce is end..
    console.log("Some change");

});
server.listen(3000);