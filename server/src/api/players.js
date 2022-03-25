const express = require('express');
const { currentGames } = require('../domain/GameManager');
const { HttpExceptions } = require('../utils/exceptions');

const router = express.Router();

router.post('/game/:gameId/players/:playerNick', (req, res) => {
  try {
    const { gameId, playerNick } = req.params;
    const game = currentGames.getGame(gameId);
    game.addPlayer(playerNick);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    if (error instanceof HttpExceptions) {
      res.status(error.statusCode).send({ message: error.message });
    } else {
      res.status(500).send({ message: 'Internal server error' });
    }
  }
});

router.delete('/game/:gameId/players/:playerNick', (req, res) => {
  try {
    const { gameId, playerNick } = req.params;
    const game = currentGames.getGame(gameId);
    game.removePlayer(playerNick);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    if (error instanceof HttpExceptions) {
      res.status(error.statusCode).send({ message: error.message });
    } else {
      res.status(500).send({ message: 'Internal server error' });
    }
  }
});

router.get('/game/:gameId/players', (req, res) => {
  try {
    const { gameId } = req.params;
    const game = currentGames.getGame(gameId);
    const gamePlayers = game.players.map(x = x.name);
    res.status(200).send({gamePlayers});
  } catch (error) {
    console.error(error);
    if (error instanceof HttpExceptions) {
      res.status(error.statusCode).send({ message: error.message });
    } else {
      res.status(500).send({ message: 'Internal server error' });
    }
  }
});

module.exports = { PlayerRoutes: router };
