
/*
Example showing a simple http 

*/
var https = require("https");
var fs=require('fs');
var url = require('url');
var path= require("path");
//Private SSL key and signed certificate
var options = {
key: fs.readFileSync('serverkey.pem'),
cert: fs.readFileSync('servercert.crt')
};
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
//counter to echo requests
var counter = 1; //to count invocations of function(req,res)


https.createServer(options,function(req, res){
    serveStaticFile(res,
        '/thermostat.html',
        'text/html');

}).listen(3000);

console.log('Server Running at http://127.0.0.1:3000  CNTL-C to quit');

//Cntl+C to stop server (in Windows CMD console)



