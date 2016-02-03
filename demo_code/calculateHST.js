/*
Example of exporting properties to client who "require()" this module

NOTE: don't do both exports.xxx and module.exports in the same module -they will conflict

HST Calculator
==============
Module to help compute tax and tip for restaurant prices

*/


var taxPercentage = 13; // % Ontario HST 2014

function calcHST(x) {return x*taxPercentage/100;}
exports.tax = calcHST;
exports.total = function(x) {return x  + calcHST(x);}



