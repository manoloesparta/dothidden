const socketio = require('socket.io');

class SocketService {
  constructor(server) {
    const options = { cors: { origin: '*' } };
    const io = socketio(server, options);

    io.on('connection', (socket) => {
      console.log('user connected', socket.id);
    });

    this.io = io;
  }

  emit(event, body) {
    if (body) {
      this.io.emit(event, body);
    }
  }
}

module.exports = { SocketService };
