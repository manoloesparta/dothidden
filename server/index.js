const express = require('express');

const app = express();
const http = require('http');

const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server);

const rooms = {}

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

app.post('/game', (req, res) =>{
  console.log("WAS")
  io.emit('createGame', 'S2B7')
  console.log("IS")
});

socket.on('createGame', gameName => {
  const game = {
      id: uuid(),
      name: gameName,
      sockets: []
     };
     rooms[room.id] = room;
     //joinRoom(socket, room);
     console.log("GAME HAS BEEN CREATED")
     console.log(id)
     console.log(name)
  });