// using express to handle routing
var express = require('express');
var app = express();

// http server for loading html pages
var http = require('http').Server(app);
// socket.io for handling websockets
var io = require('socket.io')(http);
var path = require('path');


app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'index.html'));
});
// start node server
http.listen(8888, function(){
    console.log('listening on *:8888');
});
app.use(express.static(__dirname));

// event handler for when a client connects 
io.on('connection', function(socket){
    // socket ID is a unique identifier for this particular connection
    // it assigns a new one for every new browser connection, even if it's the same user.
    console.log(socket.id, "connected");

    // cookies can be accessed as per usual from a socket connection
    // console.log("cookies", socket.request.headers.cookie);

    socket.on('newmessage', function(msg) {
        console.log("New chat message", msg);
        io.sockets.emit("newmessage", msg);
    });

});




