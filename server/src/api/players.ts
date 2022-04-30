import { Router } from 'express';

import { logger, checkPathParams } from '../utils/utils';
import { HttpException } from '../utils/exceptions';
import { currentLobbies } from '../domain/LobbyManager';

const router: Router = Router();

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
    if (error instanceof HttpException) {
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
    if (error instanceof HttpException) {
      res.status(error.statusCode).send({ message: error.message });
    } else {
      res.status(500).send({ message: 'Internal server error' });
    }
  }
});

router.get('/game/:gameId/players/:playerNick', (req, res) => {
  try {
    checkPathParams(req, 'gameId', 'playerNick');

    const { gameId, playerNick } = req.params;
    const lobby = currentLobbies.getLobby(gameId);
    const player = lobby.getPlayer(playerNick);

    res.status(200).send({ player: player.name });
  } catch (error) {
    logger.error(error);
    if (error instanceof HttpException) {
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
    if (error instanceof HttpException) {
      res.status(error.statusCode).send({ message: error.message });
    } else {
      res.status(500).send({ message: 'Internal server error' });
    }
  }
});

export { router as PlayerRoutes };
