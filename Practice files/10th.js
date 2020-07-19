// Parsing The data
const http=require('http');
const routes=require('./routes');
//for connecting 

const server=http.createServer(routes);
// Here we are devlope a server for everry incoming req 
    
server.listen(3000);