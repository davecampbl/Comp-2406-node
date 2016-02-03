/*
Examples shows exporting and replacement of the whole exports object using "module.exports" instead of just exports.

Reminder:
exports.a = b; //adds a property "a" to the default exports object whereas module.exports = a replaces the default exports object with a.


*/

//Function meant to be used as a constructor
var Calculator = function(aPercentage,aTip){ 
   this.taxRate = aPercentage;
   this.tipRate=aTip;
}
Calculator.prototype.calcTax = 
   function(amount) {return amount*(this.taxRate)/100;}
Calculator.prototype.calcTip =
   function(amount) {return amount*(this.tipRate)/100}
Calculator.prototype.calcTotal = 
   function(amount) {return amount + this.calcTax(amount)+this.calcTip(amount);}

module.exports = Calculator;



