L.D.Nel: this code is modified from Anil Somayaji's winter 2014 version

in that it uses the bcrypt-nodejs npm module instead of the bcrypt module


bcrypt-nodejs does not rely on external native products like 
visual-studio
 or python etc. required on Windows so it should 
run on all application environments: Windows,Mac, Linux.



The only modification required were:

1)requireing bcrypt-nodejs instead of requiring bcrypt

2)adding an additional "progress" callback to the bcrypt.hash() function.

No other changes were made to the code.

This code runs as an Express 3.x application.
That is, it has not been migrated to Express 4.x