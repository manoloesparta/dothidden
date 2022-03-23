const { Player } = require('./Player');

class Game {
  constructor(gameId, host) {
    this.gameId = gameId;
    this.host = host;
    this.players = [];
  }

  addPlayer(player) {
    return this.players.push(new Player(player, 0, 0));
  }

  removePlayer(player) {
    this.players = this.players.filter((user) => user.name !== player);
  }
}

module.exports = { Game };
