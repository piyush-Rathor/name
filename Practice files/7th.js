    const http=require('http');
    const fs=require('fs');
    // File system requirement....
    const server=http.createServer((req,res)=>
{
      const method= req.method;
      const url=req.url;
    if(url==='/')
    {
    res.write('<html><head><title>hey</title></head><body><form action="/message" method="POST"><input type="text"><button type="submit">submit</button></form></body></html>');
    // Jab is form ko submit p click karenge to //massage aageya url m n POST methord bhi aayega
    return res.end();
    }
    if(url ==='/message' && method === 'POST')// Agar dono condition satisfile karengi than code run hoga
    {
    fs.writeFileSync('messagerevice.txt','DUMMYS');// it Add,s a File in same folder and that file contain DUMMY text
    res.statusCode= 302; //Set responce Code
    res.setHeader('Location','/');
    // here headder shows the file ..kha file Create karani h
    return res.end();
    }
    res.setHeader('Content-type','text/html');
    res.write('<html><head><title>hey</title></head><body>hey guys</body></html>');
    res.end();
});
server.listen(3000);