
/*
Example showing a simple http 

*/
var https = require("https");
var fs=require('fs');
//Private SSL key and signed certificate
var options = {
key: fs.readFileSync('serverkey.pem'),
cert: fs.readFileSync('servercert.crt')
};

//counter to echo requests
var counter = 1; //to count invocations of function(req,res)


https.createServer(options,function(req, res){
  console.log('REQUEST: ', req.method, " ", req.url);
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Req[' + counter++ + '] URL: ' + req.url + '\nHello Secure World\n');
}).listen(3000);

console.log('Server Running at http://127.0.0.1:3000  CNTL-C to quit');

//Cntl+C to stop server (in Windows CMD console)



