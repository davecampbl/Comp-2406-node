
// Furnace.js
var Thermostat = require("./Thermostat.js");
var util = require("util");



var isOn=false;

var Class = function(therm){this.thermostat=therm;
		this.thermostat.on("run",function(){isOn=true;});
this.thermostat.on("stop",function(){isOn=false;});
}

//util.inherits(Class, EventEmitter);
Class.prototype.isON=function(){
return isOn;}




module.exports = Class; 


