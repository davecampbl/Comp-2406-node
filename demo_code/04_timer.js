/*
The Heat Is On

*/


var roomTemp = 20; //degrees C

var furnaceIsOn = false; //temporary boolean to represent
                         //furnace for now


//Keep updating the temperature based on whether furnace is on
 
//start a timeout timer and recursively restart it each time.
setTimeout( function again(){
   if(furnaceIsOn ) roomTemp++;
   else roomTemp--;
   console.log('TEMP: ' + roomTemp);
   setTimeout(again, 1000); //recursively restart timeout
   }, 1000);

