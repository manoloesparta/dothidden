const express = require('express');

const { currentGames } = require('../domain/GameManager');

const router = express.Router();

router.post('/game', (req, res) => {
  const gameId = currentGames.createGame();
  res.status(200).send({ code: gameId });
});

module.exports = { GameRoutes: router };
