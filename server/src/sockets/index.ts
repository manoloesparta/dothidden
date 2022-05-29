import e from 'cors';
import http from 'http'
import socketio from 'socket.io'
import { Lobby } from '../domain/Lobby';
import { LobbyManager } from '../domain/LobbyManager';
import { Hider } from '../domain/Players';
import { handleSocketException } from '../utils/requests';
import { logger } from '../utils/utils';

const lobbies: LobbyManager = LobbyManager.getInstance();

const factor = Math.pow(10, 12)
const [minY, minX] = [32.53626880580044, -117.09652185801386].map(i => i * factor)
const [maxY, maxX] = [32.52982856516069, -117.06854105562938].map(i => i * factor)
 
export class SocketService {

  private io: socketio.Server;

  public constructor(server: http.Server) {
    const options = { cors: { origin: '*' } };
    const io: socketio.Server = new socketio.Server(server, options);

    io.on('connection', (socket) => {
      socket.on('server.game.join', (data) => {
        socket.join(data.lobbyId)
        socket.join(`${data.lobbyId}.${data.username}`)
      });
      socket.on('server.lobby.countdown', (data) => this.roomEmit(data.lobbyId, 'client.lobby.countdown', {time: data.time}))
      socket.on('server.player.position', (data) => handleSocketException(data, playerPositionHandler));
      socket.on('server.game.start', (data) => handleSocketException(data, startGameHandler));
      socket.on('error', (error) => logger.error(error));
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

const normalizeCoordinates = ({ x, y }) => {
  x *= factor;
  y *= factor;
  const diagonal = Math.sqrt(Math.pow(maxX - minX, 2) + Math.pow(maxY - minY, 2));
  return {
    x: ((x - minX) / diagonal),
    y: ((y - minY) / diagonal),
  } 
}

const playerPositionHandler = (data) => {
  const lobby: Lobby = lobbies.getLobby(data.lobbyId);
  const { x, y } = normalizeCoordinates(data.player.position);

  if(data.player.type === 'hider') {
    const player: Hider = lobby.game.hiders.find((hider) => hider.name == data.player.name);
    player.moveTo(x, y);
  } else {
    lobby.game.seeker.moveTo(x, y);
  }
  console.log(`Player ${data.player.name} in lobby ${lobby.lobbyId} moved to ${x},${y}`)
}

const startGameHandler = (data) => {
  const lobby: Lobby = lobbies.getLobby(data.lobbyId);
  lobby.startGame();
}
