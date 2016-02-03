/*
Example of a sending and receiving cookies with Express 4.x.
This example uses unsigned cookies
 
PREREQUISITES:

install modules listed in package.json with command:

npm install

(Note this code is based on express versions: 4.x and not on the earlier express 3.x)
*/

/*
Exercise: Use browser to view pages at http://localhost:3000/

In Firefox install the view cookies addon and use it to
examine the cookies associated with a particular page
Here are the steps:

In firefox type 'alt' key so so the upper toolbar.

From tools menu select Add-ons and from resulting page
select "Get Add-ons"

Use search function and search for "View Cookies" and install the add-on.

You can now view the cookies associated with the page being visited as follows:

In firefox type 'alt' key to display toolbar
From the tools menu select "page info"

In the resulting dialog choose the view cookies icon and you should see the cookies.

*/

function serveStaticFile(res, path, contentType, responseCode){
    if(!responseCode) responseCode = 200;
    fs.readFile(__dirname + path, function(err, data){
        if(err){
            //for now use success code
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('[' + counter++ + ']: ' + '500 INTERNAL FILE ERROR' + '\n');
        }
        else {
            res.writeHead(responseCode , {'Content-Type': contentType});
            res.end(data);

        }
    });
}
var express = require('express'); //express framework
var logger = require('morgan');  //request logger
var cookieParser = require('cookie-parser');
var fs=require('fs');
var app = express();

//catch all requests an log them using app.all route
app.all('*', function(req, res, next){
  console.log('-------------------------------');
  console.log('req.path: ', req.path);
  next(); //allow next route or middleware to run
});

var cookieSecret = 'COMP2406 rules!';
app.use(cookieParser(cookieSecret));

//use morgan logger to keep request log files
app.use( logger('dev'));


app.get('/', function(req,res){
  console.log('COOKIE:');
  console.log(req.cookies);
    //var num=req.cookies.picture;
  if(!req.cookies.picture){
    console.log('SETTING COOKIE');
    res.cookie("picture","1",{maxAge: 60*60*1000,
                                   httpOnly: true,
                                   path: '/'});
      serveStaticFile(res,
          '/public/img/lion3.jpg',
          'image/jpeg');
  }
    else {
        if(req.cookies.picture==0){
            res.cookie("picture","1", {maxAge: 60*60*1000,
                httpOnly: true,
                path: '/'});
            serveStaticFile(res,
                '/public/img/lion3.jpg',
                'image/jpeg');

        }
      if(req.cookies.picture==1){
          res.cookie("picture","2", {maxAge: 60*60*1000,
              httpOnly: true,
              path: '/'});
          serveStaticFile(res,
              '/public/img/lion4.jpg',
              'image/jpeg');

      }
      if(req.cookies.picture==2){
          res.cookie("picture","0", {maxAge: 60*60*1000,
              httpOnly: true,
              path: '/'});
          serveStaticFile(res,
              '/public/img/goose.jpg',
              'image/jpeg');

      }


  }

   // res.send("Sending Cookie");
 });



app.listen(3000);

console.log('Express Server Running at http://127.0.0.1:3000  CNTL-C to quit');