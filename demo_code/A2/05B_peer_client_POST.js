
/*
Simple example of node.js HTTP client using POST method instead of GET.

Start the peer server first then each time this app is run it should get some data from the server. Client and server pass JSON objects between each other.

Example based on:
Brad Dayley "Node.js, MongoDB and AngularJS web development" chapter 7

*/



//Cntl+C to stop server (in Windows CMD console)

var http = require('http'); //need to http
var Furnace=require("./Furnace.js");
var furn=new Furnace();

var options = {
  hostname: 'localhost',
  port: '3000',
  path: '/',
  method: 'POST'
};

/*
var temperature = 20;  //degrees celsius

setInterval(function(){
   console.log('temperature: ' + temperature++)}, 1000);
*/

function readJSONResponse(response){
  var responseData = '';
  response.on('data', function(chunk){responseData += chunk});
  response.on('end', function() {
      var dataObj = JSON.parse(responseData);
      if (dataObj.message == "on" && !(furn.isON())) {
          console.log("Turning Furnace on.");
          furn.turnOn();
      }

    else if(dataObj.message=="off" && furn.isON()) {
        console.log("Turning Furnace off.");
        furn.turnOff();
    }
    //console.log('Raw Response: ' + responseData);
    console.log('Instruction: Turn Furnace ' + dataObj.message);
    console.log(dataObj.temperature);
  });
}

/*var req = http.request(options, readJSONResponse);
if(furn.isON()) {
    req.write('{"status" : "true", "something":"Something"}');
}
else{
    req.write('{"status" :"false", "something":"Something"}');
}*/
setTimeout( function again(){
    var req = http.request(options, readJSONResponse);
    if(furn.isON()) {
        req.write('{"status" : "true"}');
    }
    else{
        req.write('{"status" :"false"}');
    }

    req.end();
    if(furn.isON()) {
        console.log("Furnace is Currently on.");
    }
    else{
        console.log("Furnace is Currently off.");
    }
    setTimeout(again, 1000); //recursively restart timeout
}, 1000);
//If the previous line is replaced by the next
//it does not work
//req.write("{'name' : 'Bilbo', 'occupation': 'Burgler'}");


