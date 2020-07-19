const http=require('http');
const server=http.createServer((req,res)=>{
    const url=req.url; 
    // req.url it returns the url...so url(variable) m url m store ho jaegi
    if(url==='/')
    //Agar url root dir m hi h (matlab localHost:3000 k bad kuch na likha ho)
{
    res.setHeader('Content-type','text/html');
    //set,s Headder
    res.write('<html><head><title>hey</title></head><body><form action="/massage" methord="POST"><input type="text"><button type="submit">Submit</button></form></body></html>');
    return res.end(); 
    // Here return,s show it will return. That means (niche wala code) exicute ni hoga...yhi se return kar dega return
}
    // Ye ek tarah se else jab (localhost m 3000 k aage b kuch or likh diya ho)
    res.setHeader('Content-type','text/html');
    //Set,s Headder
    res.write('<html><head><title>hey</title></head><body>hey guys</body></html>');//wrote HTML Code
    res.end();
});
server.listen(3000);
// After running This we gate a text type and a Submit when we r click on submit 
// tab niche wali 3 line exicut hogi .....q k form Submit k bad wo search
// /massage jo usko milega no to aage ka code exicute ho jaega..