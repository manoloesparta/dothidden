const express = require('express');
const { currentLobbies } = require('../domain/LobbyManager');
const { HttpExceptions } = require('../utils/exceptions');
const { logger, checkPathParams } = require('../utils/utils');

const router = express.Router();

router.post('/game/:gameId/players/:playerNick', (req, res) => {
  const io = req.app.get('socketService');
  try {
    checkPathParams(req, 'gameId', 'playerNick');

    const { gameId, playerNick } = req.params;
    const lobby = currentLobbies.getLobby(gameId);
    lobby.addPlayer(playerNick);

    io.emit('lobby.update', { names: lobby.getPlayerNames(), lobby: lobby.lobbyId });
    res.sendStatus(200);
  } catch (error) {
    logger.error(error);
    if (error instanceof HttpExceptions) {
      res.status(error.statusCode).send({ message: error.message });
    } else {
      res.status(500).send({ message: 'Internal server error' });
    }
  }
});

router.delete('/game/:gameId/players/:playerNick', (req, res) => {
  const io = req.app.get('socketService');
  try {
    checkPathParams(req, 'gameId', 'playerNick');

    const { gameId, playerNick } = req.params;
    const lobby = currentLobbies.getLobby(gameId);
    lobby.removePlayer(playerNick);

    io.emit('lobby.update', { names: lobby.getPlayerNames(), lobby: lobby.lobbyId });
    res.sendStatus(200);
  } catch (error) {
    logger.error(error);
    if (error instanceof HttpExceptions) {
      res.status(error.statusCode).send({ message: error.message });
    } else {
      res.status(500).send({ message: 'Internal server error' });
    }
  }
});

router.get('/game/:gameId/players', (req, res) => {
  try {
    checkPathParams(req, 'gameId');

    const { gameId } = req.params;
    const lobby = currentLobbies.getLobby(gameId);

    res.status(200).send({ names: lobby.getPlayerNames() });
  } catch (error) {
    logger.error(error);
    if (error instanceof HttpExceptions) {
      res.status(error.statusCode).send({ message: error.message });
    } else {
      res.status(500).send({ message: 'Internal server error' });
    }
  }
});

module.exports = { PlayerRoutes: router };
