/*
This example is a port from COMP2406 winter 2014 Session
demo (Express 3.x) to the newer Express 4.x.

*************************
This particular example uses the cookie-session npm module
instead of the express-session module as the previous 
session examples did
*****************************

The session demo illustrates the use of sessions, which in turn
are based on cookies.

The demo uses a session to keep track of the user that is
currently logged in.

In particular the '/' route will direct the client to
the login screen but once logged in the same route
will route them to the users screen. This demonstrates
as simple login system.

Express 3.x has the cookie parser and session middleware
built in, but express 4.x requires that these middleware be
installed separately. The modules used are:
cookie-parser and express-session

This example also uses the GET-post-redirect pattern to
redirect the user client after they have logged in
Exercise: this code does not specify a re-direct status code.
Which one (e.g. 302, 303, ...) is sent to the client browser?


*/


var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
//var routes = require('./routes'); //also works explain why

var app = express();

// view engine setup
app.locals.pretty = true; //Express 4.x to see pretty HTML for jade output
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/public/images/favicon.ico')); 
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(cookieSession({secret: '2406 Rules!'}));

//order is important here.
//Try putting the app.get and app.post after the app.use(..static...

//intercept and log all requests to the app
//Note since no path a specified all paths will
//be intercepted (a path of '/' should have the same effect); 

app.use(function(req, res, next){
  console.log('-------------------------------');
  console.log('req.path: ', req.path);
  console.log('HEADER:');

  for(x in req.headers) console.log(x + ': ' + req.headers[x]);

  next(); //allow next route or middleware to run
});

app.get('/', routes.index);
app.get('/users', routes.users);
app.get('/student',routes.student);
app.get('/ta',routes.ta);
app.get('/professor',routes.professor);
app.get('/admin',routes.admin);
app.post("/login", routes.login);
app.post("/logout", routes.logout);
app.post("/createAssignment",routes.createAssignment);
app.post("/startAssignment",routes.startAssignment);
app.post("/completeAssignment",routes.completeAssignment);
app.post("/newUser",routes.newUser);

//serve static files from public directory.
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

module.exports = app;
