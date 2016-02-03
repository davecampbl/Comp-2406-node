
/*
   This code is a port of Anil Somayaji's winter 2014 Adventure Demo
   to Express 4.x.
   It is intended as a tutorial exercise to fix the "band-aid" solution
   for specifying room routes.
 */

var express = require('express');
//var routes = require('./routes'); Only in Express 3.x
var path = require('path');
var fs = require('fs');
var routes = require('./routes/index');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

var http = require('https');  // note https, not http!
var MongoStore = require('connect-mongo')(session);

var app = express();

var options = {
  key: fs.readFileSync('keys/comp2406-private-key.pem'),
  cert: fs.readFileSync('keys/comp2406-cert.pem')
};

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
//app.use(express.methodOverride()); //from express 3.x not implemented here

app.use(cookieParser('COMP 2406 adventure demo!'));
app.use(session({
    cookie: {maxAge: 60000 * 20} // 20 minutes
    , secret: "Shh... I'm a secret"
    , store: new MongoStore({db: "adventure-demo"})
}));


//set up routes

app.get('/', routes.redirectLoggedIn, routes.index);

/*
FOR NOW HARD-CODED ROOM ROUTES (Band-aid solution to fix)
*/
/*var tempRooms = ['sickbay', 'engineering', 'bridge', 'holodeck', 'secret'];
for(var i=0; i<tempRooms.length; i++)
   app.get('/' + tempRooms[i], routes.makeRoomHandler(tempRooms[i]));*/
//app.get('/', routes.redirectLoggedIn, routes.index);
app.post("/register", routes.register);
app.post("/start", routes.start);
app.post("/quit", routes.quit);

app.use(express.static(path.join(__dirname, 'public')));

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
var createRooms = function() {
    var i, theRoom;
    var result=[];
    routes.getRooms().toArray(
	function(err, docs) {
	    if (err) {
		throw "Couldn't find active room list";
	    }
	    
	    var activeRooms = docs[0].activeRooms;

	    /*activeRooms.forEach(function(roomName) {
		console.log('Creating room: ' + roomName);
		//FOR NOW DON'T MAKE ROUTES HERE
		//Hard-coded "band-aid" solution used instead for now

		//app.get('/' + roomName,routes.makeRoomHandler(roomName));
	    });*/
        app.get('/visitRoom',routes.makeRoomHandler());

	}
    );

}

routes.connectToDBs(createRooms);


http.createServer(options, app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port') +
	      ' in ' + app.get('env') + ' mode.');
});
