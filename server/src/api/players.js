const express = require('express');
const { currentGames } = require('../domain/GameManager');

const router = express.Router();

router.post('/game/:gameId/players/:playerNick', (req, res) => {
  const { gameId, playerNick } = req.params;
  const game = currentGames.getGame(gameId);
  game.addPlayer(playerNick);
  res.sendStatus(200);
});

router.delete('/game/:gameId/players/:playerNick', (req, res) => {
  const { gameId, playerNick } = req.params;
  const game = currentGames.getGame(gameId);
  game.removePlayer(playerNick);
  res.sendStatus(200);
});

router.get('/game/:gameId/players', (req, res) => {
  const { gameId } = req.params;
  const game = currentGames.getGame(gameId);
  console.log(game.players);
  res.json(game.players);
});

module.exports = { PlayerRoutes: router };
