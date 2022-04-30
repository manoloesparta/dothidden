import { Game } from './Game';
import {Lobby} from './Lobby'
import {NotFoundException} from '../utils/exceptions'
import {randString} from '../utils/utils'


class LobbyManager {

  lobbies: Map<string, Lobby>;

  constructor() {
    this.lobbies = new Map<string, Lobby>();
  }

  createLobby(host: string): string {
    let lobbyId: string = randString(5);
    while (this.checkExists(lobbyId)) {
      lobbyId = randString(5);
    }
    this.lobbies.set(lobbyId, new Lobby(lobbyId, host));
    return lobbyId;
  }

  checkExists(lobbyId: string): boolean {
    return this.lobbies.has(lobbyId)
  }

  getLobby(lobbyId: string): Lobby {
    if (this.checkExists(lobbyId)) {
      return this.lobbies.get(lobbyId);
    }
    throw new NotFoundException(`GameId: ${lobbyId} not found`);
  }

  removeLobby(lobbyId: string) {
    this.lobbies.delete(lobbyId)
  }
}

const currentLobbies = new LobbyManager();
Object.freeze(currentLobbies);

export { currentLobbies };
