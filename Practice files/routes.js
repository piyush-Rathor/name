const fs=require('fs');
const reqestHandler =(req,res) => {
    const url = req.url;
    const method = req.method;

if(url==='/')
{
    res.write('<html><head><title>hey</title></head><body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">submit</button></form></body></html>');
    return res.end();
}
if(url ==='/message' && method === 'POST')
{
    const body=[];//here v r creating a array to assemble al the chunk 
    req.on('data' /*an event thi **this event will be fired whenever a new chunkis ready to read*/,(chunk)=>{// on methord are allow to listen to sertain event
        console.log(chunk);
        body.push(chunk);// Here all the chunks push in to body aaray 
    });  
    return req.on ('end',()=>{
    const parsedBody= Buffer.concat(body).toString() ;//convert chunk in to buffer 
    const message=parsedBody.split('=')[1];  
    console.log(parsedBody);
    fs.writeFile('message.txt',message,err =>{
    res.statusCode= 302;
    res.setHeader('Location','/');
    return res.end();
    
    });
    });


    
}
    res.setHeader('Content-type','text/html');
    res.write('<html><head><title>hey</title></head><body>hey guys</body></html>');
    res.end();
    
}
module.exports =reqestHandler ;
//This is use to adding the files
