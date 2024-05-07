// import modules
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

//create an express app
const app = express();
// create a server instance
const server = http.createServer(app);
// create a socket instance
const io = socketIo(server);

// middleware to block messages containing the word 'dog'
io.use((socket, next) => {
  socket.on('message', (msg) => {
    if (msg.toLowerCase().includes('dog')) {
      console.log('Blocked a message.');
    } else {
      next();
    }
  });
});

// listen for connection event
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('message', (msg) => {
    io.emit('message', msg);
  });
});

// start the server
server.listen(3000, () => console.log('Server is running on port 3000'));