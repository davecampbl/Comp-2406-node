/*
example from: Sams Teach Yourself Node.js in 24 hours

code example using the underscore.js module
which was installed from npm online registry using commandline:

npm install underscore

*/


var _ = require('underscore');
_.each([1,2,3], function(num){
   console.log("underscore.js says: " + (num*10));
});
//for each of 1,2,3 output a statement with 10* the number for the iteration
//Documentation http://underscorejs.org/

/*
OUTPUT:
underscore.js says: 10
underscore.js says: 20
underscore.js says: 30
*/

/*Exercise: go to http://npmjs.org and use the search field to see what your can learn about the underscore module
*/
