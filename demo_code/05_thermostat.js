/*
The Heat Is On
*/

// 
var Thermostat = require("./Thermostat.js");
var therm = new Thermostat(); //thermostat controlling furnace

therm.setThermostat(18);

var roomTemp = 20; //degrees C

var furnaceIsOn = false; //temporary boolean to represent
                         //furnace for now

therm.on("run", function() {
  //console.log("Turn Furnace: ON");
});
therm.on("stop", function() {
  //console.log("Turn Furnace: OFF");
});


//Keep updating the temperature and tell thermostat
//what the temperature is
 
//start a timeout timer and recursively restart it each time.
setTimeout( function again(){
   if(furnaceIsOn ) roomTemp++;
   else roomTemp--;
   if(roomTemp<=15){ furnaceIsOn=true;
	console.log("Furnace: ON");}
   if(roomTemp>=20){ furnaceIsOn=false;
	console.log("Furnace: OFF");}
   therm.temp(roomTemp); //tell thermostat the room temp
   
   console.log('TEMP: ' + roomTemp);
   setTimeout(again, 1000); //recursively restart timeout
   }, 1000);

