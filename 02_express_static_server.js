/*
Example of a "static server implemented with the express framework.

PREREQUISITES:

intall latest express module with command:

npm install express

(Note this code is based on express versions: 4.x and not on the earlier express 3.x)
*/

/*
Use browser to view pages at http://localhost:3000/index.html.

*/


var express = require('express'); 
var app = express();
var logger= require('morgan');
var root_dir = '/public'; //root directory for our static pages

//catch all request an log them using app.all route
app.all('*', function(req, res, next){
  console.log('-------------------------------');
  console.log('req.path: ', req.path);
  console.log('serving:' + __dirname + root_dir + req.path);
  next(); //allow next route or middleware to run
});
//use morgan logger to keep request log files
app.use( logger('dev'));
//use static middleware to implement static server
app.use(express.static(__dirname + root_dir));

app.listen(3000);

console.log('Static Express Server Running at http://127.0.0.1:3000  CNTL-C to quit');