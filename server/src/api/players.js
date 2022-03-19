const express = require('express');

const { currentGames } = require('../domain/GameManager');

const router = express.Router();

router.post('/game/{gameId}/players/{playerNick}', (req, res) => {
  const { gameId, playerNick } = req.params;
  const game = currentGames.getGame(gameId);
  const player = new Player(playerNick);
  game.addPlayer(player);
  res.sendStatus(200);
});

module.exports = { PlayerRoutes: router };
