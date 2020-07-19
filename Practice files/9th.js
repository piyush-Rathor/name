// Parsing The data
const http=require('http');
const fs=require('fs');

const server=http.createServer((req,res)=>{ 
    // Here we are devlope a server for everry incoming req 
    const method= req.method;
    const url=req.url;
    if(url==='/')
{
    res.write('<html><head><title>hey</title></head><body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">submit</button></form></body></html>');
    return res.end();
}
if(url ==='/message' && method === 'POST')
{
    const body=[];
    //here v r creating a array to assemble al the chunk 
    req.on('data' /*an event thi **this event will be fired whenever a new chunkis ready to read*/,(chunk)=>{// on methord are allow to listen to sertain event
        console.log(chunk);
        body.push(chunk);// Here all the chunks push in to body aaray 
    });  
    req.on ('end',()=>{// this will be fired ones it,s done parsing the in comming request data or the in coming request
    const parsedBody= Buffer.concat(body).toString();//convert chunk in to buffer 
    console.log(parsedBody);
    });
    fs.writeFileSync('message.txt','DUMMY');// it is syncronuslly ..that means it blocks the next codes jab tak k ye khud pura ni ho jata thats why we r use writeFile......
    res.statusCode= 302;
    res.setHeader('Location','/');
    return res.end();
}
    res.setHeader('Content-type','text/html');
    res.write('<html><head><title>hey</title></head><body>hey guys</body></html>');
    res.end();
});
server.listen(3000);