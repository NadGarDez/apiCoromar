const express = require('express');
const http = require('http')
const socketio = require('socket.io');

const app = express();
const server = http.Server(app);
const websocket = socketio(server);
server.listen(7070, () => console.log('listening on *:3000'));

console.log(websocket)

// The event will be called when a client is connected.
websocket.on('connection', (socket) => {
  console.log('A client just joined on', socket.id);
});
