const express = require('express');

const app = express();
const http = require('http');

const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server);

app.get('/ping', (req, res) => {
  res.sendStatus(200);
});

app.get('/health', (req, res) => {
  res.sendStatus(200);
});

io.on('connection', (socket) => {
  console.log('a user connected');
  console.log(socket);
});

server.listen(8080, () => {
  console.log('listening on *:8080');
});
