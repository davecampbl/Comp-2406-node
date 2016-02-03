/*
*/

// Thermostat.js
var util = require("util");
var EventEmitter = require('events').EventEmitter;

var desiredTemperature = 20; //desired room temperature
var hysteresis = 2.5; //thermostat hysteresis

var Class = function() { }

util.inherits(Class, EventEmitter);

Class.prototype.temp = function(temp) {
  if(temp < desiredTemperature - hysteresis ) {
      this.emit("run");
  }
  else if(temp > desiredTemperature + hysteresis) { 
      this.emit("stop");
  }
};

Class.prototype.setThermostat = function(temp){
   desiredTemperature = temp;
}

module.exports = Class; 