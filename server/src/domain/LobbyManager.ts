import { Lobby } from './Lobby'
import { NotFoundException } from '../utils/exceptions'
import { randString } from '../utils/utils'


export class LobbyManager {

  private lobbies: Map<string, Lobby>;

  private static instance: LobbyManager;

  public static getInstance(): LobbyManager {
    if(!LobbyManager.instance) {
      LobbyManager.instance = new LobbyManager();
    }
    return LobbyManager.instance;
  }

  private constructor() {
    this.lobbies = new Map<string, Lobby>();
  }

  public createLobby(host: string): string {
    let lobbyId: string = randString(5);
    while (this.checkExists(lobbyId)) {
      lobbyId = randString(5);
    }
    this.lobbies.set(lobbyId, new Lobby(lobbyId, host));
    return lobbyId;
  }

  private checkExists(lobbyId: string): boolean {
    return this.lobbies.has(lobbyId)
  }

  public getLobby(lobbyId: string): Lobby {
    if (this.checkExists(lobbyId)) {
      return this.lobbies.get(lobbyId);
    }
    throw new NotFoundException(`GameId: ${lobbyId} not found`);
  }

  public removeLobby(lobbyId: string) {
    this.lobbies.delete(lobbyId)
  }
}
