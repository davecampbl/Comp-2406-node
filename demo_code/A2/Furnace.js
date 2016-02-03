
// Furnace.js
var util = require("util");



var isOn=false;

var Class = function(){};

Class.prototype.turnOff=function(){isOn=false;};
Class.prototype.turnOn=function(){isOn=true;};
//util.inherits(Class, EventEmitter);
Class.prototype.isON=function(){
return isOn;};




module.exports = Class; 


