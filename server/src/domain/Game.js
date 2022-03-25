const { Player } = require('./Player');
const { ConflictException } = require('../utils/exceptions');

class Game {
  constructor(gameId, host) {
    this.gameId = gameId;
    this.host = host;
    this.players = [];
    this.addPlayer(host);
  }

  addPlayer(player) {
    this.players.forEach((user) => {
      if (user.name === player) {
        throw new ConflictException('Player nickname already in use');
      }
    });
    return this.players.push(new Player(player, 0, 0));
  }

  removePlayer(player) {
    this.players = this.players.filter((user) => user.name !== player);
  }
}

module.exports = { Game };
