import http from 'http'
import socketio from 'socket.io'

export class SocketService {

  io: socketio.Server;

  constructor(server: http.Server) {
    const options = { cors: { origin: '*' } };
    const io: socketio.Server = new socketio.Server(server, options);

    io.on('connection', (socket) => {
      console.log('user connected', socket.id);
    });

    this.io = io;
  }

  emit(event: string, body: any) {
    if (body) {
      this.io.emit(event, body);
    }
  }
}

module.exports = { SocketService };
