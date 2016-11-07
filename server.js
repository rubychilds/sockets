var express = require('express');
var app = express();
var http = require('http');
var io = require('socket.io');

var server = http.createServer(app);
io = io.listen(server);

server.listen(8080);
app.use(express.static(__dirname + '/public'));

var line_history = [];

io.on('connection', function(socket){
  console.log('Connected');

  for(var i in line_history){
    socket.emit('draw_line', {line: line_history[i]});

  }

  // called when client emits draw line
  socket.on('draw_line', function(data){
    console.log('hi received data from client');
    line_history.push(data.line); // adds to end of the array
    io.emit('draw_line', {line: data.line});
  });

  socket.on('clear', function(){
    console.log('clear');
    line_history = [];
    io.emit('clear');
  });

});

console.log('running server on 8080')
