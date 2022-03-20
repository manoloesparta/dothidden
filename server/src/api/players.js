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
<<<<<<< HEAD
  game.removePlayer(playerNick);
  res.sendStatus(200);
});

router.get('/game/:gameId/players', (req, res) => {
  const { gameId } = req.params;
  const game = currentGames.getGame(gameId);
  console.log(game.players);
  res.json(game.players);
=======
  const player = new Player(playerNick);
  game.addPlayer(player);
  res.sendStatus(200);
>>>>>>> 9673bad05f4386079d3d4c5869fd46173f9d367a
});

module.exports = { PlayerRoutes: router };
