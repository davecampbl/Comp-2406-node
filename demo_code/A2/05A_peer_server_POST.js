/*
Simple server/client pair of node.js apps using the POST
http method rather than GET.


JSON objects are passed back an forth between the client and server node.js apps using the POST method

Example based on:
Brad Dayley "Node.js, MongoDB and AngularJS web development" chapter 7

*/

var isInt = function (n) { return n === (n | 0); };//obtained online from http://stackoverflow.com/questions/3885817/how-to-check-if-a-number-is-float-or-integer
//Cntl+C to stop server (in Windows CMD console)

var http = require('http'); //need to http
var Thermostat =require('./Thermostat.js');
var therm=new Thermostat();
var furn="off";
var turnfurn="off";
therm.setThermostat(18);

var temperature = 20;  //degrees celsius

setInterval(function(){//this is where we would obtain the actual room temperature.
    if(furn=="on")
        console.log('temperature: ' + temperature++);

    else if(furn=="off")
        console.log('temperature: ' + temperature--);
    therm.temp(temperature);
}, 1000);

therm.on("run", function() {
    //console.log("Turn Furnace: ON");
        turnfurn="on";
});
therm.on("stop", function() {
    turnfurn="off";
    //console.log("Turn Furnace: OFF");
});

http.createServer(function (request,response){
     var jsonData = '';

     request.on('data', function(chunk) {
        jsonData += chunk;
     });

     request.on('end', function() {


         var reqObj = JSON.parse(jsonData);
         if (reqObj.status == 'false')
             furn = "off";
         else if (reqObj.status == 'true')
             furn = "on";
         /* if (isInt(reqObj.settemp))
          therm.setThermostat(reqObj.settemp);*/


        //console.log('reqObj: ', reqObj);
        //console.log('jsonData: ', jsonData );
        //console.log('typeof jsonData: ', typeof jsonData );
        var resObj = {
            'message' : turnfurn,
            'furnace' : furn,
            'hysteresis' : therm.hysteresis,
            'thermset' : therm.getSetting(),
            'temperature' : 'Current room temperature is:' + temperature};
        response.writeHead(200);
        response.end(JSON.stringify(resObj));
     });


 }).listen(3000);

console.log('Server Running at http://127.0.0.1:3000  CNTL-C to quit');