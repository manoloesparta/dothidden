const { Lobby } = require('./Lobby');
const { NotFoundException } = require('../utils/exceptions');
const { randString } = require('../utils/utils');

class LobbyManager {
  constructor() {
    this.lobbies = {};
  }

  createLobby(host) {
    let lobbyId = randString(5);
    while (this.checkExists(lobbyId)) {
      lobbyId = randString(5);
    }
    this.lobbies[lobbyId] = new Lobby(lobbyId, host);
    setTimeout(() => this.removeGame(lobbyId), 24 * 60 * 60 * 1000);
    return lobbyId;
  }

  checkExists(lobbyId) {
    return lobbyId in this.lobbies;
  }

  getLobby(lobbyId) {
    if (this.checkExists(lobbyId)) {
      return this.lobbies[lobbyId];
    }
    throw new NotFoundException(`GameId: ${lobbyId} not found`);
  }

  removeLobby(lobbyId) {
    delete this.lobbies[lobbyId];
  }
}

const currentLobbies = new LobbyManager();
Object.freeze(currentLobbies);

module.exports = { currentLobbies };
