/*
Simple examples of a node.js application acting as a client.

Start the peer server first then each time this app is run it should get some data from the server
*/

/*
Use browser to view pages at http://localhost:3000/index.html.

*/

//Cntl+C to stop server (in Windows CMD console)

var http = require('http'); //need to http
var url = require('url');

var options = {
  hostname: 'localhost',
  port: '3000',
  path: '/furnace?start=on'

}

/*
var temperature = 20;  //degrees celsius

setInterval(function(){
   console.log('temperature: ' + temperature++)}, 1000);
*/

function handleResponse(response){
  var serverData = '';
  response.on('data', function(chunk){serverData += chunk});
  
  response.on('end', function(){
     console.log('Response Status: ', response.statusCode);
     console.log('Response Headers: ',response.headers);
     console.log(serverData);
     });
}

http.request(options, function(response){
   handleResponse(response);
}).end();


console.log('Client Running at http://127.0.0.1:3000  CNTL-C to quit');