/**
 * Created by King David on 01/10/2014.
 */
var fs = require('fs');
var colour=require('colour')
//var array = fs.readFileSync('demo_code/songs/sister_golden_hair.txt').toString().split("\n");
var array = fs.readFileSync('A1/public/songs/song1.txt').toString();
var chords=""
var lyrics=""
var txt=""
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
        //txt.concat(chords);
        //txt.concat(lyrics);
	txt+=chords;
	txt+=lyrics;
        //console.log(chords.green);
        chords="";
        //console.log(lyrics.cyan);
        lyrics="";
        continue;
    }
    lyrics+=text.charAt(i);
    if(num<=0){
        chords+=" ";
        continue;
    }
    num--;
    continue;

}

//document.getElementById("lyrics").innerHTML=text;
console.log(txt);