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
  let index = game.players.map((property) => property.name === playerNick);
  console.log(index = game.players.map((property) => property.name === playerNick));
  game.removePlayer(index.indexOf(true));
  res.sendStatus(200);
});

router.get('/game/:gameId/players', (req, res) => {
  const { gameId } = req.params;
  const game = currentGames.getGame(gameId);
  res.json(game.players);
});

module.exports = { PlayerRoutes: router };
