/*
Simple server/client pair of node.js apps using the POST
http method rather than GET.


JSON objects are passed back an forth between the client and server node.js apps using the POST method

Example based on:
Brad Dayley "Node.js, MongoDB and AngularJS web development" chapter 7

*/


//Cntl+C to stop server (in Windows CMD console)

var http = require('http'); //need to http

/*
var temperature = 20;  //degrees celsius

setInterval(function(){
   console.log('temperature: ' + temperature++)}, 1000);
*/


http.createServer(function (request,response){
     var jsonData = '';

     request.on('data', function(chunk) {
        jsonData += chunk;
     });

     request.on('end', function(){
        var reqObj = JSON.parse(jsonData);
        console.log('reqObj: ', reqObj);
        console.log('jsonData: ', jsonData );
        console.log('typeof jsonData: ', typeof jsonData );
        var resObj = {
            'message' : 'Hello ' + reqObj.name,
            'question' : 'Are you a good ' + reqObj.occupation + '?'};
        response.writeHead(200);
        response.end(JSON.stringify(resObj));
     });


 }).listen(3000);

console.log('Server Running at http://127.0.0.1:3000  CNTL-C to quit');