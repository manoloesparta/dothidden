const { Player } = require('./Player');

class Game {
  constructor(gameId, host) {
    this.gameId = gameId;
    this.host = host;
    this.players = [];
  }

  addHider(player) {
  }

  addSeeker(player) {
  }

  addPlayer(player) {
    return this.players.push(new Player(player, 0, 0));
  }

  removePlayer(player) {
    this.players = this.players.filter((user) => user.name !== player);
  }

  gameLoop() {
  }

  start() {
  }

  stop() {
  }

  assignRoles() {
  }
}

module.exports = { Game };
