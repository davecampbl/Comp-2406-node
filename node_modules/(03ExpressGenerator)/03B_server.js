/*
node simple server example to serve specific text strings to client based on client requested url page.

Example based on "Web Development with Node and Express" by Ethan Brown, Chapter 2
*/

/*
Use browser to view http://localhost:3000/about.html.

query strings and optional trailing '/' are removed from
query url. For example:
  http://localhost:3000/about.html/?name=Lou will have the
  query string, after '?' removed along with trailing '/'.

//output should show request url to be: /about.html
//we can use this information as the basis or routing
to the desired page
*/

//Cntl+C to stop server (in Windows CMD console)

var http = require('http');
var counter = 1000; //to count invocations of function(req,res)

//replace ? query portion and trailing '/' in url
//with emtpy string using a regular expression pattern


http.createServer(function (request,response){
     var path = request.url.replace(/\/?(?:\?.*)$/,'').toLowerCase();

   //write HTTP header

   var page = '';
   switch(path){
     case '/about.html':
       page = 'ABOUT PAGE';
       response.writeHead(200, {'Content-Type': 'text/plain'});
       response.end('[' + counter++ + ']: ' + page + '\n');
       break;

     case '/index.html':
       page = 'HOMEPAGE';
       response.writeHead(200, {'Content-Type': 'text/plain'});
       response.end('[' + counter++ + ']: ' + page + '\n');
       break;

     default:
       page = 'ERROR 404 PAGE NOT FOUND';
       //exercise: change error code to 404 instead of 200
       //and see how the browser responds
       response.writeHead(200, {'Content-Type': 'text/plain'});
       response.end('[' + counter++ + ']: path= ' + path + '\n' + page + '\n');
       break;
}
   //end HTTP response and provide final data to send
}).listen(3000, "127.0.0.1");
console.log('Server Running at http://127.0.0.1:3000  CNTL-C to quit');