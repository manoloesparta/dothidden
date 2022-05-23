import { Game } from './Game';
import { Player } from './Players';

import { ConflictException, NotFoundException } from '../utils/exceptions';
import { SocketService } from '../sockets';

export class Lobby {

  public lobbyId: string;
  public game: Game
  public host: string;
  private players: Array<Player>
  private emitter: any;

  constructor(lobbyId: string, host: string, emitter: SocketService) {
    this.lobbyId = lobbyId;
    this.host = host;
    this.players = [];
    this.addPlayer(host);
    this.emitter = (event: string, message: string) => emitter.roomEmit(lobbyId, event, message)
  }

  private findPlayer(playerName: string): Player {
    const found: Player = this.players.find((player) => playerName == player.name);
    if(!found) {
      throw new NotFoundException('Player not found')
    }
    return found
  }

  public getPlayerNames(): Array<string> {
    return this.players.map((player) => player.name);
  }

  public addPlayer(playerName: string) {
    this.players.forEach((player) => {
      if (player.name === playerName) {
        throw new ConflictException('Player nickname already in use');
      }
    });
    this.players.push(new Player(playerName, 0, 0, this.emitter));
  }

  public removePlayer(playerName: string) {
    this.findPlayer(playerName);
    this.players = this.players.filter((player) => player.name !== playerName);
  }

  public getPlayer(playerName: string): Player {
    return this.findPlayer(playerName);
  }
}
