/* Example of javascript functions

Example adapted from:
 "Elequent Javascript" 2nd ed. by Marijn Haverbeke
http://eloquentjavascript.net/03_functions.html


Exercise 1: 

Modify the code given below so that the mountain function makes use of the underscore character, just like the flat function does, expect the mountain tops will have to be drawn on the previous line of the output.

Also modify the code so that the following script portion will result in the terrain shown. One difference is that a mountain can have a only a steep peak with no flat section.

  //BUILD SCRIPT
  flat(3)
  hill(7);
  flat(2);
  hill(5);
  flat(4);
  hill(2);
  flat(2);
  //END SCRIPT


function and the program produces the following terrain.

    _____    ___
___/     \__/   \____/\_


Exercise 2: 

Modify the code from exercise 1 so you can have both hills and mountains. Mountains are require two output lines. 

After completing exercise 2 the following BUILD SCRIPT portion should produce the output shown. 

  //BUILD SCRIPT
  flat(3)
  mountain(7);
  flat(2);
  mountain(4);
  flat(4);
  hill(3);
  flat(1);
  //END SCRIPT


function and the program produces the following terrain.

     ___     
    /   \    /\      _
___/     \__/  \____/ \_


*/


var landscape = function() {
  var result1 = "";
  var result2 = "";
  var result3 = "";
  var result;
  var flat = function(size) {
    for (var count = 0; count < size; count++){
      result1 += "_";
      result2 += " ";
      result3 += " ";  
    }
  };
  var hill = function(size) {
    result1 += "/";
    result2 += " ";
    result3 += " ";
    for (var count = 0; count < size-2; count++){
      result2 += "_";
      result1 += " ";
      result3 += " ";

    }
   result1+="\\";
   result2+=" ";
   result3+=" ";
  };
  var mountain = function(size) {
    result1 += "/ ";
    result2 += " /";
    result3 += "  ";
    for (var count = 0; count < size-4; count++){
      result2 += " ";
      result1 += " ";
      result3 += "_";

    }
   result1+=" \\";
   result2+="\\ ";
   result3+=" ";
  };


  //BUILD SCRIPT
  flat(3)
  mountain(7);
  flat(2);
  mountain(4);
  flat(4);
  hill(3);
  flat(3);
  hill(5);
  flat(1);
  //END SCRIPT
  result3 +="\n";
  result2 += "\n";
   result=result3.concat(result2.concat(result1));
    //result += "\\";
  return result;


};


console.log(landscape());
// ? ___/''''\______/'\_
