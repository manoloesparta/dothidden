const express = require('express');

const { currentGames } = require('../domain/GameManager');

const router = express.Router();

router.post('/game', (req, res) => {
  const host = 'DAGZ';
  const gameId = currentGames.createGame(host);
  res.status(200).send({ code: gameId });
});

module.exports = { GameRoutes: router };
