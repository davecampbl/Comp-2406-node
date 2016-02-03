/*
Example of requiring our own helper module

Note the require() function is taking a string here that looks like a path. When it does not look like a path it looks for the module in the npm created node_modules directory
*/

//require our own module
var calculator = require("./calculateHST");


var itemPrice = 10.00;

console.log("price:  $" + itemPrice);
console.log("HST:    $" + calculator.tax(itemPrice));
console.log("total:  $" + calculator.total(itemPrice));

/* The next line will not work because the non exported features
of the module are private. This provides one of the many ways to fake namespaces in javascript 
*/

//console.log("tax percentage" + calculator.taxPercentage );

