/*
node simple server example1 to server text string to client
based on client requested url page
*/

/*
use browser to view http://localhost:3000/about.html
//output should show request url to be: /about.html
//we can use this information as the basis or routing
to the desired page
*/

//Cntl+C to stop server (in Windows CMD console)

var http = require('http');
var counter = 1000; //to count invocations of function(req,res)

http.createServer(function (request,response){
   //var requestURL = request.url;
   //write HTTP header
   response.writeHead(200, {'Content-Type': 'text/plain'});
   //end HTTP response and provide final data to send
   response.end('Request[' + counter++ + ']' + '\n'  
                 + 'requestURL: ' + request.url + '\n');
}).listen(3000, "127.0.0.1");
console.log('Server Running at http://127.0.0.1:3000  CNTL-C to quit');
//outputs the counter from the earlier example, but also outputs the request url, but the requestURL is never declared or given a value.