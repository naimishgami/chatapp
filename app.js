var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

users = [];
connections = [];

server.listen(2244);
console.log('Server listening on 2244 !!!');
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket) {
    connections.push(socket);
    console.log('Active Connections are : %s',connections.length);

    socket.on('disconnect', function(socket) {
        if(!socket) return;
        console.log('sockect disc :::', socket);
        users.splice(users.indexOf(socket.userName), 1);
        updateUserNames();
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected : %s',connections.length);
    });

    socket.on('send message', function(data){
        io.sockets.emit('new message', { msg : data, user:socket.userName});
    });

    socket.on('new user', function(data, cb){
        cb(true);
        socket.userName = data;
        users.push(socket.userName);
        updateUserNames();
    });

    function updateUserNames(){
        io.sockets.emit('get users', users);
    }
})