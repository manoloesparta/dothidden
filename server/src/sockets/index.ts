import http from 'http'
import socketio from 'socket.io'

export class SocketService {

  private io: socketio.Server;

  public constructor(server: http.Server) {
    const options = { cors: { origin: '*' } };
    const io: socketio.Server = new socketio.Server(server, options);

    io.on('connection', (socket) => {
      socket.on('game.join', (data) => socket.join(data.gameId));
    });

    this.io = io;
  }

  public emit(event: string, body: any) {
    if (body) {
      this.io.emit(event, body);
    }
  }

  public roomEmit(room: string, event: string, body: any) {
    if(body) {
      this.io.to(room).emit(event, body);
    }
  }
}

module.exports = { SocketService };
