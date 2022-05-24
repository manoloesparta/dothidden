import http from 'http'
import socketio from 'socket.io'
import { Lobby } from '../domain/Lobby';
import { LobbyManager } from '../domain/LobbyManager';
import { Hider } from '../domain/Players';

const lobbies: LobbyManager = LobbyManager.getInstance();

export class SocketService {

  private io: socketio.Server;

  public constructor(server: http.Server) {
    const options = { cors: { origin: '*' } };
    const io: socketio.Server = new socketio.Server(server, options);

    io.on('connection', (socket) => {
      socket.on('game.join', (data) => socket.join(data.lobbyId));

      socket.on('player.position', playerPositionHandler);

      socket.on('game.start', startGameHandler);
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

const playerPositionHandler = (data) => {
  const lobby: Lobby = lobbies.getLobby(data.lobbyId);
  const { x, y } = data.player.position;

  if(data.player.type === 'hider') {
    const player: Hider = lobby.game.hiders.find((hider) => hider.name == data.player.name);
    player.moveTo(x, y);
  } else {
    lobby.game.seeker.moveTo(x, y)  ;
  }
}

const startGameHandler = (data) => {
  const lobby: Lobby = lobbies.getLobby(data.lobbyId);
  lobby.startGame();
}