//import modules
const express = require('express');
const WebSocket = require('ws');
const http = require('http');

//create a new express app
const app = express();
//create a new http server
const server = http.createServer(app);
//create a new WebSocket server
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    message = String(message);
    console.log('Received: ' + message);
    //check if the message contains "dog" or "dogs"
    if (message.toLowerCase().includes('dog')) {
      //send a message back to the client
      ws.send('The word "dog" or "dogs" are not allowed.');
    } else {
      //broadcast message to all clients
      wss.clients.forEach((client) => {
        //check if the client is still connected
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    }
  });
  //when a client closes the connection
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

//start our server
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
