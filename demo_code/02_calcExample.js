var Calculator = require("./Calculator.js");

var calculator = new Calculator(13,15); //13%tax 15%tip

var itemPrice = 200; //$200.00

console.log("price: $" + itemPrice);
console.log("tip: $" + calculator.calcTip(itemPrice));

console.log("tax: $" + calculator.calcTax(itemPrice));
console.log("---------------");
console.log("total: $" + calculator.calcTotal(itemPrice));
