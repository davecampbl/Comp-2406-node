// storeRooms.js

var mc = require('mongodb').MongoClient;

var rooms = [
    {
	name: "roomList",
	activeRooms: ['bridge', 'sickbay', 'engineering', 'secret', 'holodeck']
    },
    {   name: "bridge",
	title: "Bridge",
	description: "You are on the Bridge.  There are big comfy chairs and a big screen here.",
	roomExits: ['sickbay']
    },    
    {
	name: "engineering",
	title: "Engineering",
	description: "You are in Engineering.  There are lots of funny instruments, many smaller screens, and kind of uncomfortable chairs.",
	roomExits: ['sickbay', 'holodeck']
    },
    {
	name: "sickbay",
	title: "Sickbay",
	description: "You are in Sickbay.  It is in the center of the ship, the safest place there is.  There are lots of comfy beds here and blinky lights.",
	roomExits: ['engineering','bridge']
    },
    {
	name: "holodeck",
	title: "The Holodeck",
	description: "You are outside the Holodeck.  Unfortunately, it has a sign on it that says 'out of order'.  Sorry.",
	roomExits: ['engineering']
    },
    {
	name: "secret",
	title: "Secret Room",
	description: "This is a secret room.  How did you get here?",
	roomExits: ['engineering', 'sickbay', 'bridge']
    }
];

mc.connect('mongodb://localhost/adventure-demo', function(err, db) {
    if (err) {
	throw err;
    }
    
    var roomsCollection = db.collection('rooms');

    roomsCollection.drop(function(err, count) {
	if (err) {
	    console.log("No collection to drop.");
	} else {
	    console.log("room collection dropped.");
	}
	roomsCollection.insert(rooms, function(err, rooms) {
	    if (err) {
		throw err;
	    }

	    rooms.forEach(function(room) {
		console.log("Added " + room.name);
	    });
	    db.close();
	});
    });
});

