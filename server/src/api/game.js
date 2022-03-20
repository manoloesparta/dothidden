const express = require('express');

const { currentGames } = require('../domain/GameManager');
const { BadRequestException } = require('../utils/exceptions');
const { checkBody } = require('../utils/utils');

const router = express.Router();

router.post('/game', (req, res) => {
  try {
    checkBody(req, 'host');
    const host = 'DAGZ';
    const gameId = currentGames.createGame(host);
    res.status(200).send({ code: gameId });
  } catch (error) {
    console.error(error);
    if (error instanceof BadRequestException) {
      res.status(error.statusCode).send({ message: error.message });
    } else {
      res.status(500).send({ message: 'Internal server error' });
    }
  }
});

module.exports = { GameRoutes: router };
