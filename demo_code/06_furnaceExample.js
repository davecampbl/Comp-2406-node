//06_furnaceExample.js

var Thermostat = require("./Thermostat.js");
var Furnace = require("./Furnace.js");

var therm = new Thermostat(); //thermostat controlling furnace

var furnace = new Furnace(therm); //make new furnace controlled
                                  //by thermostat
therm.setThermostat(18); //set desired room temperature

var roomTemp = 20; //actual room temperature degrees C



//Keep updating the temperature and tell thermostat
//what the temperature is
 
//start a timeout timer and recursively restart it each time.

setTimeout( function again(){
   if(furnace.isON()) roomTemp++;
   else roomTemp--;

   therm.temp(roomTemp); //tell thermostat the room temp

   console.log('TEMP: ' + roomTemp);

   setTimeout(again, 1000); //recursively restart timeout

   }, 1000);

