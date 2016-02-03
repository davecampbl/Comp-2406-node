/*var fs = require('fs'); 
fs.readFile('songs/sister_golden_hair.txt', function(err, data) {
  if(err) throw err; 
  var array = data.toString().split("\n"); 
  for(i in array) { console.log(array[i]); } 
});*/


var fs = require('fs'); 
var colour=require('colour')
//var array = fs.readFileSync('demo_code/songs/sister_golden_hair.txt').toString().split("\n"); 
var array = fs.readFileSync('demo_code/songs/sister_golden_hair.txt').toString(); 
var chords=""
var lyrics=""
var chrd=false;
var num=0;
var text=array.toString();
var length=text.length;
for(var i=0;i<length;i++) {
	if(text.charAt(i)=='['){
   	 chrd=true;
   	 continue;
	}
	if(text.charAt(i)==']'){
  	 chrd=false;
  	 continue;
	}
	if(chrd==true){
	  chords+=text.charAt(i);
	  num++;
 	  continue;
	}
	if(text.charAt(i)=='\n'){
	 chords+="\n";
	 lyrics+="\n";
	 console.log(chords.green);
	 chords="";
	 console.log(lyrics.cyan);
         lyrics="";
 	 continue;
	}
	lyrics+=text.charAt(i);
	if(num<=0){
	 chords+="";
	 continue;  
	}
	num--;
	continue;
}
//console.log(chords);
//console.log(lyrics);
//console.log(text);