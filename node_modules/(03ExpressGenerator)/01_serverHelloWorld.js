/*
node simple server example1 to server text string to client
Notice the effect of function(request, reponse) on counter
*/

//use browser to view http://localhost:3000
//to view

//Cntl+C to stop server

var http = require('http');
var counter = 1000; 

http.createServer(function (request,response){
   //write HTTP header
   response.writeHead(200, {'Content-Type': 'text/plain'});
   //end HTTP response and provide final data to send
   response.end('David Campbell, 100822601 ' + counter++ + '\n');
}).listen(2999, "127.0.0.1");
console.log('Server Running at http://127.0.0.1:3000  CNTL-C to quit');
//server side counter is incremented each time the message is sent