import { Game } from './Game';
import { Player } from './Players';

import { ConflictException, NotFoundException } from '../utils/exceptions';
import { SocketService } from '../sockets';
import { randInt } from '../utils/utils';

export class Lobby {

  public lobbyId: string;
  public game: Game
  public host: string;
  public roomEmitter: any;
  public playerEmitter: any;
  private players: Array<Player>

  constructor(lobbyId: string, host: string, emitter: SocketService) {
    this.lobbyId = lobbyId;
    this.host = host;
    this.players = [];
    this.roomEmitter = (event: string, message: string) => emitter.roomEmit(lobbyId, event, message)
    this.playerEmitter = (player: string, event: string, message: string) => emitter.roomEmit(`${lobbyId}.${player}`, event, message)
    this.addPlayer(host);
  }

  private findPlayer(playerName: string): Player {
    const found: Player = this.players.find((player) => playerName == player.name);
    if(!found) {
      throw new NotFoundException('Player not found')
    }
    return found
  }

  public startGame() {
    this.game = new Game(this.roomEmitter, this.playerEmitter);
    this.assignRoles();
    this.game.start();
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
    this.players.push(new Player(playerName, 0, 0));
  }

  public removePlayer(playerName: string) {
    this.findPlayer(playerName);
    this.players = this.players.filter((player) => player.name !== playerName);
  }

  public getPlayer(playerName: string): Player {
    return this.findPlayer(playerName);
  }

  public assignRoles() {
    const hiderIndex = randInt(0, this.players.length);
    this.game.addSeeker(this.players[hiderIndex]);
    const playersCopy = [... this.players];
    playersCopy.splice(hiderIndex, 1);
    playersCopy.forEach((player) => this.game.addHider(player));
  }
}
