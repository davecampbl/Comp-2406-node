
/*
Example of a SYNCHRONOUS file read.
the readFileSync() function blocks (waits) and only returns once the file is read.

See
http://nodejs.org/api/fs.html
and more specifically: http://nodejs.org/api/fs.html#fs_fs_readfilesync_filename_options

*/

var fs = require('fs'); 
var array = fs.readFileSync('songs/sister_golden_hair.txt').toString().split("\n"); 
for(var i in array) {
    console.log(array[i]); }
