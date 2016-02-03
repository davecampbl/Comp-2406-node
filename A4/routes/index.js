

var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
var mongo = new MongoClient();
var data=[];
var theSong=null;


function eraseData(){//used to clear the data object
    data=[];
}
function addData(val){//adds data to the data array, also keeps the maximum size at 12 to not generate too many results
    data.unshift(val);
    if(data.length>12)
     data.pop();
    console.log(val.toString() +" added.");
}



function index(req, res) {//the index page, it will redirect to search page

        res.render('index', { title: 'COMP 2406 Session Demo' });
}
function results(req,res){//displays the results of the search
    res.render('search.jade', { songs: data });

}
function displayChords(req,res){//used previously but not anymore
    console.log("Sending: " +theSong);
    res.render('displayChords', { title: theSong.title, composer:theSong.composer,style:theSong.style,key:theSong.key,bars:theSong.bars});
}

function queries(terms,callback){//call a search for each element of the terms array, where the terms are the words entered into the search bar
    for(var i=0;i<terms.length;i++){
        query(terms[i]);

    }

    setTimeout(function() { callback(data); }, 1000);
}

function query(terms) {//searches for all songs where the title contains the substring terms
    var MongoClient = require('mongodb').MongoClient;
    var Server = require('mongodb').Server;
    var mongo = new MongoClient();


    mongo.connect("mongodb://localhost/iRealSongs", function(err, db){
        if(err) console.log('FAILED TO CONNECT TO DATABASE');
        else {
            var myDB = db.db("iRealSongs");
            console.log('CONNECTED TO DATABASE');

                //console.log("searching" + terms[i]);
                myDB.collection("songs", function (err, collection) {


                    var cursor = collection.find({title: {$regex: terms}});
                    cursor.each(function (err, document) {
                        if (document != null) {
                            //console.log(document);
                            addData(document);

                        }
                        myDB.close();
                    });

            });

        }
        //callback(data);

    });

}
function formatSong(song){//needed sleep, couldnt think this one through. was supposed to format the song to make displaying it easy
    var ans=[];
    var top="";
    var bot=[];

    console.log(ans);
    return ans;

}

function barToString(bar,tp,bt){//was supposed to turn a given bar into a string. currently unfinished
    var ans=[];
    var top="";
    var bot="";
    if(bar.leftRepeat)
        bot+=":";
    if(bar.leftDoubleBarLine)
        bot+="|";
    if(bar.RehearsalLetter)
        top+=bar.RehearsalLetter;
    if(bar.intro)
        top+="[intro]";
    if(bar.coda)
        top+="@";
    if(bar.delSegno)
        top+="$";
    if(bar.firstEnding)
        top+="1)";
    if(bar.secondEnding)
        top+="2)";
    if(bar.dCalThirdEnd)
        top+="D.C. al 3rd end";
    if(bar.oneMeasureRepeat)
        bot+="%";
    else if(bar.twoMeasureRepeat)
        bot+="R";
    for(var i=0;i<bar.chords.length;i++){
        bot+=bar.chords[i];
    }
    tp=top;
    bt=bot;
}

function find(songname,callback) {//finds the song with the title songname
    var MongoClient = require('mongodb').MongoClient;
    var Server = require('mongodb').Server;
    var mongo = new MongoClient();


    mongo.connect("mongodb://localhost/iRealSongs", function(err, db){
        if(err) console.log('FAILED TO CONNECT TO DATABASE');
        else{
            var myDB = db.db("iRealSongs");
            console.log('CONNECTED TO DATABASE');
            myDB.collection("songs", function(err, collection){
                var cursor = collection.find({title:songname});
                cursor.each(function(err,document){
                    if(document!=null){
                        //console.log(document);
                        addData(document);

                    }
                    myDB.close();
                });
            });
        }
        //callback(data);
        setTimeout(function() { callback(data); }, 1000);
    });


}

function search(req,res){//handles the search requests of the clients
    console.log("Searching for :" + req.body.search);
    eraseData();
    var str=req.body.search.split(" ");
    queries(str,function renderSearch(dat){res.render('search.jade', { songs: dat });console.log("opening page");});


    console.log(data);
   // res.redirect('/results');



    //console.log(data);
}

function findChords(req,res){//handles when clients want to see the page for a given song

        eraseData();
        find(req.body.song, function renderSearch(dat) {
            res.render('displayChords.jade', { song: dat[0],text:formatSong(dat[0]) });
            console.log("opening page");
        });

    //console.log(data[0]);
    //res.redirect('/displayChords');

}
function upload(req,res){//unfinished, was supposed to handle the uploaded file and add it to the database.
    console.log(req.body.upload);
    res.render('index', { title: 'COMP 2406 Session Demo' });

}


//exports
exports.index = index;
exports.search= search;
exports.results= results;
exports.findChords= findChords;
exports.displayChords=displayChords;
exports.upload=upload;

