var bcrypt = require("bcrypt-nodejs");
var mc = require('mongodb').MongoClient;
var playersCollection;
var roomsCollection;

var connectToDBs = function(callback) {
    mc.connect('mongodb://localhost/adventure-demo', function(err, db) {
	if (err) {
	    throw err;
	}
	
	playersCollection = db.collection('players');
	roomsCollection = db.collection('rooms');

	callback();
    });
}

var index = function(req, res){
    console.log('routes::index');
    var showIndex = function(err, players) {
	var onlinePlayers = [];
	if (players.length > 0) {
	    players.forEach(function(p) {
		onlinePlayers.push(p.playername);
	    });
	}
	res.render('index', { title: 'COMP 2406 Adventure Demo',
			      error: req.query.error,
			      onlinePlayers: onlinePlayers + ""});
    }
    playersCollection.find({playing: true}).toArray(showIndex);
}

var redirectLoggedIn = function(req, res, next) {
    console.log('routes::redirectLoggedIn');
    if (req.session.player) {
        res.redirect("/visitRoom");
    } else {
        next();
    }
}

var redirectNotLoggedIn = function(req, res, next) {
    console.log('routes::redirectNotLoggedIn');
    if (req.session.player) {
        next();
    } else {
        res.redirect("/");
    }
}

var register = function(req, res) {
   console.log('routes::register');

    var playername = req.body.playername;
    var password = req.body.password;

    var addPlayer = function(err, players) {
	if(players.length!=0){
	    res.redirect("/?error=player already exists");	
	    return;
	}
	
	//generate a salt, with 10 rounds (2^10 iterations)
	bcrypt.genSalt(10, function(err, salt) {
	    console.log('running genSalt callback');
	    bcrypt.hash(password, salt, function(){console.log('progress');}, function(err, hash) {
		console.log('running bcrypt.hash callback');

      		var newPlayer = {
      		    playername: playername,
      		    password: hash,
		    playing: false,
		    room: "bridge"
      		};
      		
      		playersCollection.insert(newPlayer, function(err, newPlayers){
		    if (err) {
			throw err;
		    } else {
      			res.render('registered', 
				   { playername: newPlayers[0].playername });
		    }
      		});    
	    });
	});	
    };	
 
    if ((typeof(playername) != 'string') ||
	/[^a-zA-Z0-9]/.test(playername)) {
	res.redirect("/?error=invalid player name, must only be letters and numbers");	
    } else {
	playersCollection.find({playername: playername}).toArray(addPlayer);
    }
}

var start = function(req, res){
    console.log('routes::start');
  
    var playername = req.body.playername;
    var password = req.body.password;

    playersCollection.findOne({playername: playername}, function(err, player){
	
	if (err || !player){
	    req.session.destroy(function(err) {
		res.redirect("/?error=invalid playername or password");	
	    });
	    return;
	}
	
	bcrypt.compare(password, player.password, function(err, authenticated){
	    if(authenticated){
		delete player._id;
		player.playing = true;
		savePlayer(player)
		req.session.player = player;
		//res.redirect("/" + player.room);
         res.redirect("/visitRoom");
	    } else {
		req.session.destroy(function(err) {
		    res.redirect("/?error=invalid playername or password");
		});
	    }
	});
    });
}

var quit = function(req, res){   
   console.log('routes::quit');
 
    if (req.session.player) {
	var player = req.session.player;
	player.playing = false;
	savePlayer(player);
    }

    req.session.destroy(function(err){
	if(err){
            console.log("Error: %s", err);
	}
	res.redirect("/");
    });	
}

var savePlayer = function(player) {
    playersCollection.update({"playername": player.playername},
			     player, function(err, count) {
				 if (err) {
				     console.log(
					 "Couldn't save player state");
				 }
			     });
}

var makeRoomHandler = function() {
    console.log('routes::makeRoomHandler');

    handler = function(req, res) {
        console.log("Handler invoked");
	if (req.session.player) {

	    var player = req.session.player;
        var roomName=req.player.room;
        var exit=req.theExit;
	    player.room = theExit;

	    savePlayer(player);
	    roomsCollection.findOne(
		{name: roomName},
		function(err, room) {
            console.log("looking for Room");
		    if (err || !room) {
			throw "Couldn't find room " + roomName;
		    }
            console.log("Rendering:" + room);
		    res.render("room.jade", room);
		}
	    );
        //res.render("room.jade",roomName);
	} else {
            res.redirect("/");
	}
    }
    return handler;
}

var getRooms = function() {
   console.log('routes::getRooms');

    return roomsCollection.find({name: "roomList"});
}

exports.index = index;
exports.redirectLoggedIn = redirectLoggedIn;
exports.redirectNotLoggedIn = redirectNotLoggedIn;
exports.register = register;
exports.start = start;
exports.quit = quit;
exports.makeRoomHandler = makeRoomHandler;
exports.getRooms = getRooms;
exports.connectToDBs = connectToDBs;
