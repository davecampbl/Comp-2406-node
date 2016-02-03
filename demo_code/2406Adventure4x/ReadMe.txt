LD Nel: This code is a minor modification 
made to Anil Somayaji's winter 2014 Adventure demo:
=======================================================

1) Replaced bcrypt npm module with bcrypt-nodejs module instead.

bcrypt requires non-js native tools to be installed to run (for
example it requires microsoft visual studio and python to be installed on
windows machines. The bcrypt-node.js does everything within
the node.js javascript environment.

This change required adding another "progress" callback function to
bcrypt.hash(...) where it appears in routes::register.

2) The code has been migrated to use Express 4.x instead of 3.x
In this code the routes for the various rooms are node hardcoded
instead of being populated from the database.

The design exercise is to fix this hard coding. It has resulted
from that fact that in express 3.x routes can be set up
asynchronously because the are applied where the use(router)
statement appears in express 3.x

But in Express 4.x they have done away with the use(router)
statement and instead routes are applied in the order in 
which they are actually created. This means they can no
longer be created asynchronously in any order. Again, the 
design exercise with this code is to fix that.

Other minor changes:

An error.jade file has been added for reporting errors
to the brower.

The express-session module was backed up to
version  "express-session": "1.4.0"
in the package.json file since later ones 
throw decprecation warnings
when used with express 4.x.





Setup and Running The Game.
===========================

Setup:

Start the mongodb server
e.g.
c:\mongodb2_6_5\bin\mongod.exe -dbpath c:\mongodb2_6_5\data\db

OPTIONAL (but recommended)
run the mongo.exe console client if you want to examine the database
that gets set up directly from the mongo client

Run the node application storeRooms.js to build the mongodb database
that represents the adventure demo rooms.

(After this you should be able to examine the rooms using the
mongo.exe console client)


To start game run node app.js

Connect with browser to https://localhost:3000
NOTE this uses https not http.
(should get start register screen)