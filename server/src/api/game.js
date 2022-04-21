const express = require('express');

const { currentLobbies } = require('../domain/LobbyManager');
const { HttpExceptions } = require('../utils/exceptions');
const { checkBody, logger } = require('../utils/utils');

const router = express.Router();

router.post('/game', (req, res) => {
  try {
    checkBody(req, 'host');
    const lobbyId = currentLobbies.createLobby(req.body.host);
    res.status(200).send({ code: lobbyId });
  } catch (error) {
    logger.error(error);
    if (error instanceof HttpExceptions) {
      res.status(error.statusCode).send({ message: error.message });
    } else {
      res.status(500).send({ message: 'Internal server error' });
    }
  }
});

module.exports = { GameRoutes: router };
