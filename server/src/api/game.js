const express = require('express');

const { currentGames } = require('../domain/GameManager');
const { BadRequestException } = require('../utils/exceptions');

const checkRequest = (request) => {
  if (!('host' in request.body)) {
    throw new BadRequestException('Must specify host of the game');
  }
};

const router = express.Router();

router.post('/game', (req, res) => {
  try {
    checkRequest(req);
    const gameId = currentGames.createGame();
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
