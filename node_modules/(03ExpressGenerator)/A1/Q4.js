/*
node simple server example to serve static html which contains a reference to another page (image) that needs to be loaded.

Example based on "Web Development with Node and Express" by Ethan Brown, Chapter 2
*/

/*
Use browser to view http://localhost:3000/about.html.

query strings and optional trailing '/' are removed from
query url. For example:
  http://localhost:3000/about.html/?name=Lou will have the
  query string, after '?' removed along with trailing '/'.

//output should show request url to be: /about.html
//we can use this information as the basis or routing
to the desired page
*/

//Cntl+C to stop server (in Windows CMD console)

var http = require('http'); //need to http
var fs = require('fs'); //need to read static files
var colour=require('colour');
var counter = 1000; //to count invocations of function(req,res)

function makehtml(fi) {//makes an html file which will contain the lyrics for the song designated by the file named 'fi' a string of html code
    var ht="<!DOCTYPE html>\n<html>\n<head lang=\"en\">\n<meta charset=\"UTF-8\">\n<title>"+ fi + "</title>\n</head>\"\n<body>\n<p id=\"demo\"></p>";
            ht+=formatlyrics(fi);
            ht+= "</body>\n</html>";
        return ht;

}
function formatlyrics(fi) {//formats the lyrics of the file 'fi' and returns an HTML paragraph

    //var array = fs.readFileSync('demo_code/songs/sister_golden_hair.txt').toString().split("\n");
    var array = fs.readFileSync(fi).toString();
    var chords="";
    var lyrics="";
    var txt="<p>";
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
            txt+="<font color=\"red\">";
            txt+=chords;
            txt+="</font><br>";
            txt+="<font color=\"green\">";
            txt+=lyrics;
            txt+="</font><br>";
            //console.log(chords.green);
            chords="";
            //console.log(lyrics.cyan);
            lyrics="";
            continue;
        }
        lyrics+=text.charAt(i);
        if(num<=0){
            chords+="&nbsp;";
            continue;
        }
        num--;
        continue;

    }
    txt+="</p>";
    //console.log(txt);
    return txt;
}

function serveStaticFile(res, path, contentType, responseCode){
   if(!responseCode) responseCode = 200;
   fs.readFile(__dirname + path, function(err, data){
     if(err){
       //for now use success code
       res.writeHead(200, {'Content-Type': 'text/plain'});
       res.end('[' + counter++ + ']: ' + '500 INTERNAL FILE ERROR' + '\n');
     }
     else {
       res.writeHead(responseCode , {'Content-Type': contentType});
       res.end(data);

     }
   });
}

//replace ? query portion and trailing '/' in url
//with emtpy string using a regular expression pattern


http.createServer(function (request,response){
     var path = request.url.replace(/\/?(?:\?.*)$/,'').toLowerCase();

   //write HTTP header

   var page = '';
   switch(path){
     case '/about.html':
       page = 'ABOUT PAGE';
       response.writeHead(200, {'Content-Type': 'text/plain'});
       response.end('[' + counter++ + ']: ' + page + '\n');
       break;
       case '/sister_golden_hair.html'://displays lyrics for this song in html format
           page = 'Sister Golden Hair';
           response.writeHead(200, {'Content-Type': 'text/html'});
           var f="A1/public/sister_golden_hair.txt";
           response.end(makehtml(f));
           break;
       case "/dont_stop_me_now.html"://displays lyrics for this song in html format
           page = 'Don\'t stop me now';
           response.writeHead(200, {'Content-Type': 'text/html'});
           var f="A1/public/don't_stop_me_now.txt";
           response.end(makehtml(f));
           break;
       case "/youre_my_best_friend.html"://displays lyrics for this song in html format
           page = 'You\'re my Best Friend';
           response.writeHead(200, {'Content-Type': 'text/html'});
           var f="A1/public/you're_my_best_friend.txt";
           response.end(makehtml(f));
           break;
       case "/she_makes_me.html"://displays lyrics for this song in html format
           page = 'she_makes_me';
           response.writeHead(200, {'Content-Type': 'text/html'});
           var f="A1/public/she_makes_me.txt";
           response.end(makehtml(f));
           break;
       case '/sister_golden_hair_advanced.html'://displays lyrics for this song in html format
           page = 'Sister Golden Hair Advanced';
           response.writeHead(200, {'Content-Type': 'text/html'});
           var f="A1/public/sister_golden_hair_advanced.txt";
           response.end(makehtml(f));
           break;
     case '/index.html'://displays the index page
         serveStaticFile(response,
             '/public/index.html',
             'text/html');
       case '/sister_golden_hair.txt'://displays the plain text file
           serveStaticFile(response,
               '/public/sister_golden_hair.txt',
               'text/plain');
     case '/greeting.html'://from tutorial 2
       serveStaticFile(response,
                       '/public/greeting.html',
                       'text/html');
       break;
     case '/img/lion3.jpg'://from tutorial 2
       serveStaticFile(response,
                       '/public/img/lion3.jpg',
                       'image/jpeg');
       break;
 case '/img/goose.jpg'://from tutorial 2
       serveStaticFile(response,
                       '/public/img/goose.jpg',
                       'image/jpeg');
       break;
     case '/liongreeting.html'://from tutorial 2
       serveStaticFile(response,
                       '/public/liongreeting.html',
                       'text/html');
       break;
     case '/goosegreeting.html'://from tutorial 2
       serveStaticFile(response,
                       '/public/goosegreeting.html',
                       'text/html');
       break;
     default:
       page = 'ERROR 404 PAGE NOT FOUND';
       //exercise: change error code to 404 instead of 200
       //and see how the browser responds
       response.writeHead(200, {'Content-Type': 'text/plain'});
       response.end('[' + counter++ + ']: path= ' + path + '\n' + page + '\n');
       break;
}
   //end HTTP response and provide final data to send
}).listen(3000, "127.0.0.1");
console.log('Server Running at http://127.0.0.1:3000  CNTL-C to quit');