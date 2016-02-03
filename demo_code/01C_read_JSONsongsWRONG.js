
/*
Read output.txt file produced by parse_songs.js
THIS IS WRONG, CAN YOU TELL WHY?
*/

var fs = require('fs'); 
var inputFilePath = "songs/output.txt";

fs.readFile(inputFilePath, 'utf8', function(err, data){
    console.log('now running callback function');
    if(err) console.log('FILE RE-READ ERROR');
    //console.log(data.toString());
    var fileData = JSON.parse(data);
  });

console.log('the data from: ' + inputFilePath );
console.log(fileData.songs[0]);




