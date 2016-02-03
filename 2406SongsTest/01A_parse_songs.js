
/*
Demonstration code to parse data from iRealB dataset of jazz fake book chord charts. 
Format of input file is as follows:

=26-2=Coltrane John=Medium Up Swing=F=n=*A[T44F^7 Ab7  |Db^7 E7  |A^7 C7  |C-7 F7  
|Bb^7 Db7  |Gb^7 A7  |D-7 G7  |G-7 C7 ]*A[F^7 Ab7  |Db^7 E7  |A^7 C7  |C-7 F7  |Bb^7 Ab7  
|Db^7 E7  |A^7 C7  |F^7   ]*B[C-7 F7  |E-7 A7  |D^7 F7  |Bb^7    |Eb-7    |Ab7    |Db^7    
|G-7 C7 ]*A[F^7 Ab7  |Db^7 E7  |A^7 C7  |C-7 F7  |Bb^7 Ab7  |Db^7 E7  |A^7 C7  
|F^7   Z=500 Miles High=Corea Chick=Bossa Nova=E-=n=[T44E-7    | x   |G-7    | x   |Bb^7    
| x   |Bh7    |E7#9    |A-7    | x   |F#h7    | x   |F-7    | x Q  |C-7    | x   |B7#9    
| x  Z        Y{QC-7    | x   |Ab^7    | x  }=502 Blues=Rowles Jimmy=Waltz=A-=n={T34A-7    
|Db^7    |Bh7    |E7#9    |A-7    |Db^7    |Bh7    |E7#9    |C-7    |F7b9    |Bb^7    
|Ab-7 Db7  |N1F#h7    |B7b9    |E^7#5    |E^7#5 E7 } |N2F#h7    |B7b9    |E-7    
| x  Z=52nd Street Theme=Monk Thelonious=Up Tempo Swing=C=n={*AT44C A-7  |D-7 G7  
|C A-7  |D-7 G7  |C A-7  |D-7 G7  |C G7  |C   }[*BC7,    | x   |F6    | x   
|D7,    | x   |G7    | x  ][*AC, A-7  |D-7 G7  |C A-7  |D-7 G7  |C A-7  
|D-7 G7  |C G7  |C   Z =9.20 Special=Warren Earl=Medium Swing=C=n={*AT44C9,    
|Eb-6,    |C9,    |Eb-6    |Bb,    |sBb7,A7,Ab7,G7 |N1lC9, F#o7,  |C9, sAb7,G7}         
|N2lC9, F#o7  |lC9, sF7,Bb][*BlBb,    |Eb, Eb6  |Eb6,    | x   |G9,    |F, F6,  |F9,    
|  F7 ][*AC9,    |Eb-6,    |C9,    |Eb-6,    |Bb,    |sBb7,A7,Ab7,G7 |lC9, F#o7 , 
|sC6,F7,Bb,D9Z =A Felicidade=Jobim Antonio-Carlos=Bossa Nova=A-=n=*A{T44A-7(C^7)    
| x   |C^7    | x   |E-7    |B7b9    |E-7 <(Repeat Optional)>A7  |D-7 G7 }[*BC^7    
| x   |Bh7    |E7b9    |A-7    | x (Ab-7)  |G-7    |C7    |F^7    |D-7    |A-7    
|D7    |A-7    |Bh7 E7b9  |A-7    |G7   ]*C[C^7  |F7  |C^7  |x  |G-7  |C7  |F^7  
|x  |D-7  |G7  |C^7  |x  |F#h7  |B7b9  |sE-7,A7, |D-7,G7,]*D[lA-7    |A-7/G    
|D7/F#    |D-7/F    |A-7    |Bh7 E7b9  |A-7    | x  Z

*/


var fs = require('fs');
var Set = require('./../2406SongsTest/set.js');
var set = new Set();

var mc = require('mongodb').MongoClient; //need to: npm install mongodb


var inputFilePath = "songs/sample_songs.txt";
//var inputFilePath = "songs/1200iRealBookJazz_rev2.txt";
var outputFilePath = "songs/output.txt";

//parsing modes
//input mode changes when an '=' is found in data file
var MODES = {
UNKNOWN : 0,
TITLE: 1,   //parsing title of song
COMPOSER: 2, //parsing composer of song
STYLE: 3,  //parsing style of song
KEY: 4,  //parsing musical key of song
N: 5,     //place holder, no parsing
SONGDATA: 6 //parsing song chord data
};

//NOTE: location and name of song data file is hard-coded.
fs.readFile(inputFilePath , function(err, data) {
  if(err) {
      console.log('ERROR OPENING FILE: ' + inputFilePath);
      throw err; 
  } 

  console.log('PARSING FILE: ' + inputFilePath);

  var fileDataString = data.toString(); //all data from file
 
  var mode = MODES.UNKNOWN;  //current parsing mode
  var parseDataString = ""; //parse data for current mode
  var currentSong = {}; //current songs being constructed
  var songsArray = []; //array of parsed songs
  var currentBar = "";//parse data for current bar
  var currentBars=[];//current bars list being constructed

  function isEmptyObject(anObject){
     //answer whether anObject is empty
     for(var item in anObject)
        if(anObject.hasOwnProperty(item)) return false;
     return true;
  }

  function parseSong(text){
      var bars=[];
      var bar=new Object();
      var curbar="";
      var barnum=1;
      for(var i=0;i<text.length;i++){
          if(text.charAt(i)=='|'){
              var index=curbar.search("{");
              if(index!=-1){
                  bar.leftRepeat=true;
                  curbar=curbar.replace("{","");
              }
              index=curbar.search("}");
              if(index!=-1){
                  bar.rightRepeat=true;
                  curbar=curbar.replace("}","");
              }
              index=curbar.search("T44");
              if(index!=-1){
                  bar.timeSignature="4/4";
                  curbar=curbar.replace("T44","");
              }
              var index2=curbar.search("T34");
              if(index2!=-1){
                  bar.timeSignature="3/4";
                  curbar=curbar.replace("T34","");
              }
              if(index2== -1 && index== -1 && barnum==1) {
                  bar.timeSignature = "4/4";
              }

              index=curbar.search("\\[");
              if(index!=-1){
                  bar.leftDoubleBarLine=true;
                  curbar=curbar.replace("[","");
              }
              index=curbar.search("\\]");
              if(index!=-1){
                  bar.rightDoubleBarLine=true;
                  curbar=curbar.replace("]","");
              }
              index=curbar.search("\\*A");
              if(index!=-1){
                  bar.RehearsalLetter="A";
                  curbar=curbar.replace("*A","");
              }
              index=curbar.search("{\\*B<\\*68 Solos:>Bb7");
              if(index!=-1){
                  bar.b68Solos="true";
                  curbar=curbar.replace("{*B<*68 Solos:>Bb7","");
              }
              index=curbar.search("\\*B");
              if(index!=-1){
                  bar.RehearsalLetter="B";
                  curbar=curbar.replace("*B","");
              }
              index=curbar.search("\\*i");
              if(index!=-1){
                  bar.intro=true;
                  curbar=curbar.replace("*i","");
              }
              index=curbar.search("Z");
              if(index!=-1){
                  bar.finalBar=true;
                  curbar=curbar.replace("Z","");
              }
              index=curbar.search("x");
              if(index!=-1){
                  bar.oneMeasureRepeat=true;
                  curbar=curbar.replace("x","");
              }
              index=curbar.search("r");
              if(index!=-1){
                  bar.rightRepeat=true;
                  curbar=curbar.replace("r","");
              }
              index=curbar.search("Q");
              if(index!=-1){
                  bar.Coda=true;
                  curbar=curbar.replace("Q","");
              }
              index=curbar.search("S");
              if(index!=-1){
                  bar.delSegno=true;
                  curbar=curbar.replace("S","");
              }
              index=curbar.search("N1");
              if(index!=-1){
                  bar.firstEnding=true;
                  curbar=curbar.replace("N1","");
              }
              index=curbar.search("N2");
              if(index!=-1){
                  bar.secondEnding=true;
                  curbar=curbar.replace("N2","");
              }
              index=curbar.search("<D.C. al 3rd end.>");
              if(index!=-1){
                  bar.dCalThirdEnd=true;
                  curbar=curbar.replace("<D.C. al 3rd end.>","");
              }
              index=curbar.search("<open for solos>");
              if(index!=-1){
                  bar.openSolos=true;
                  curbar=curbar.replace("<open for solos>","");
              }
              index=curbar.search("<*501st x slow, double time on repeat.>");
              if(index!=-1){
                  bar.stxslow=true;
                  curbar=curbar.replace("<*501st x slow, double time on repeat.>","");
              }
              index=curbar.search("l");
              if(index!=-1){
                  curbar=curbar.replace("l","");
              }
              index=curbar.search("s");
              if(index!=-1){
                  curbar=curbar.replace("s","");
              }
              index=curbar.search("U");
              if(index!=-1){
                  curbar=curbar.replace("U","");
              }
              var chords=curbar.trim().split(" ");







              bar.chords=chords;
              bars[bars.length]=bar;
              barnum++;
              bar=new Object();
              curbar="";
              }
          else{
              curbar+=text.charAt(i);
          }



      }
     //bars[bars.length-1].finalBar=true;
     return bars;
  }
  function setMode(newMode){
      

      //now leaving mode
      if(mode === MODES.TITLE){ 
           currentSong.title = parseDataString;


      }
      else if(mode === MODES.COMPOSER) {
           currentSong.composer = parseDataString;


      }
      else if(mode === MODES.STYLE) {
           currentSong.style = parseDataString;


      }
      else if(mode === MODES.KEY) {
           currentSong.key = parseDataString;


      }
      else if(mode === MODES.SONGDATA) {
           currentSong.bars = parseSong(parseDataString);
           
		   //examine some aspect of the song data
		   //by placing substring of interest into 
		   //a set to be displayed on the console
          // var testIndex = currentSong.songData.indexOf('T'); //start of time signature
         //  var theSubString = currentSong.songData.substr(0,2);
       //    if(theSubString === 'Y{') console.log(currentSong.title);
       //    set.add(theSubString);


      }

      //now entering mode
      if(newMode === MODES.TITLE) {
            if(!isEmptyObject(currentSong))
                songsArray.push(currentSong);
            currentSong = {}; //make new empty song;
       
      }



      
      mode = newMode;
      parseDataString = ""; 
  }

  //parse the file data
  for(var i=0; i<fileDataString.length; i++){
     if(fileDataString.charAt(i) == "="){
       //change parsing mode
       if(mode === MODES.UNKNOWN) setMode(MODES.TITLE);
       else if(mode === MODES.TITLE) setMode(MODES.COMPOSER);
       else if(mode === MODES.COMPOSER) setMode(MODES.STYLE);
       else if(mode === MODES.STYLE) setMode(MODES.KEY);
       else if(mode === MODES.KEY) setMode(MODES.N);
       else if(mode === MODES.N) setMode(MODES.SONGDATA);
       else if(mode === MODES.SONGDATA) setMode(MODES.TITLE);
     }
     else{
       //add data character to content for mode
       parseDataString = parseDataString + fileDataString.charAt(i);
     }
       
  } //end parse data file

  //write parsed songs to console
  //console.log(songsArray);
  console.log('THE SET');
  console.log(set.toString());

  //write parsed songs to output file.
  //write the array as a stringified JSON object.
  var dataAsObject = {};
  dataAsObject.songs = songsArray;

  fs.writeFile(outputFilePath , JSON.stringify(dataAsObject, null, 2), function(err){
    if(err) console.log(err);
    else console.log('file was saved to: ' + outputFilePath);
  });
    mc.connect('mongodb://localhost/iRealSongs', function(err, db) {
        if (err) {
            throw err;
        }

        var songsCollection = db.collection('songs');
        console.log(songsCollection);
        songsCollection.drop(function(err, count) {
            if (err) {
                console.log("No collection to drop.");
            } else {
                console.log("songs collection dropped.");
            }
            songsCollection.insert(songsArray, function(err, theSongs) {
                if (err) {
                    throw err;
                }

                //theSongs.forEach(function(aSong) {
                //console.log("Added " + aSong.title);
                //});
                db.close();

            });
        });
    });


});


