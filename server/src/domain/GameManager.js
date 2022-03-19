const { Game } = require('./Game');
const { NotFoundException } = require('../utils/exceptions');
const { randString } = require('../utils/utils');

class GameManager {
  constructor() {
    this.games = {};
  }

  createGame() {
    let gameId = randString(5);
    while (this.checkExists(gameId)) {
      gameId = randString(5);
    }
    this.games[gameId] = new Game(gameId);
    return gameId;
  }

  checkExists(gameId) {
    return gameId in this.games;
  }

  getGame(gameId) {
    if (this.checkExists(gameId)) {
      return this.games[gameId];
    }
    throw NotFoundException(`GameId: ${gameId} not found`);
  }

  removeGame(gameId) {
    delete this.games[gameId];
  }
}

const currentGames = new GameManager();
Object.freeze(currentGames);

module.exports = { currentGames };
