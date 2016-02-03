Student number 100822601
David Campbell

I did my work on a windows machine. To run the application from run node on www, in the bin directory.
I used Professor Nel's demo code as the starting point for this assignment, much of the code in app.js and www were left unchanged.
Most of the work that I did on this assignment are in index.js, 01A_parse_songs.js, and the .jade files.
Everything seems to work after testing on my machine, I used Chrome.
to access the page go to http://localhost:3000
the assignment is currently unfinished, All the upload does is redirect to the index page.
The song is not formatted correctly either, all it does right now is display the chords in a chart.
The songs are correctly added to the database, and the search function works as requested.
to run this you will need to have a mongo database ready using the name "iRealSongs" and then run "node -01A_parse_songs.js" to fill the database
after that run "node bin/www" to start the server and access it with a web browser.

Known Issues:
    if you click the view chords button and you havent selected the checkbox beside it you are redirected to the error page.
