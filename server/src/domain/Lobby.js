const { Player } = require('./Player');
const { ConflictException, NotFoundException } = require('../utils/exceptions');

class Lobby {
  constructor(lobbyId, host) {
    this.lobbyId = lobbyId;
    this.game = null;
    this.isGameRunning = false;

    this.host = host;
    this.players = [];
    this.addPlayer(host);
  }

  getPlayerNames() {
    return this.players.map((player) => player.name);
  }

  addPlayer(playerName) {
    this.players.forEach((player) => {
      if (player.name === playerName) {
        throw new ConflictException('Player nickname already in use');
      }
    });
    return this.players.push(new Player(playerName, 0, 0));
  }

  removePlayer(player) {
    this.players = this.players.filter((user) => user.name !== player);
  }

  getPlayer(playerName) {
    const player = this.players.filter((player) => player.name === playerName);
    if(!player) {
      throw NotFoundException('Player not found')
    }
    return player.name
  }
}

module.exports = { Lobby };
