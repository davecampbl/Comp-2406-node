Currently the thermostat and the furnace communicate through a server/client relationship with the thermostat acting as the server.
I ran this on windows and to make it run you need to run '05A_peer_server_POST.js' first and then '05B_peer_client_POST.js'
http_server.js serves the thermostat.html page as https.
I could not get the browser to communicate properly with the thermostat. I kept getting a Cross-Origin Request Blocked message and couldn't figure out what was wrong.
While debugging it seemed like the message was being sent but being blocked.
Weather support was not added.