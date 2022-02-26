const express = require('express');

const app = express();
const http = require('http');

const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server);

app.get('/', (req, res) => {
  console.log(req);
  res.send('hola');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  console.log(socket);
});

server.listen(8080, () => {
  console.log('listening on *:8080');
});
