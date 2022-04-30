import { Router } from 'express';

import { checkBody, checkPathParams, logger } from '../utils/utils';
import { HttpException } from '../utils/exceptions';
import { currentLobbies } from '../domain/LobbyManager';

const router: Router = Router();

router.post('/game', (req, res) => {
  try {
    checkBody(req, 'host');
    const lobbyId = currentLobbies.createLobby(req.body.host);
    res.status(200).send({ code: lobbyId });
  } catch (error) {
    logger.error(error);
    if (error instanceof HttpException) {
      res.status(error.statusCode).send({ message: error.message });
    } else {
      res.status(500).send({ message: 'Internal server error' });
    }
  }
});

router.get('/game/:gameId/host', (req, res) => {
  try {
    checkPathParams(req, 'gameId');

    const { gameId } = req.params;
    const lobby = currentLobbies.getLobby(gameId);

    res.status(200).send({ host: lobby.host });
  } catch (error) {
    logger.error(error);
    if (error instanceof HttpException) {
      res.status(error.statusCode).send({ message: error.message });
    } else {
      res.status(500).send({ message: 'Internal server error' });
    }
  }
});

router.delete('/game/:gameId', (req, res) => {
  const io = req.app.get('socketService');
  try {
    checkPathParams(req, 'gameId');

    const { gameId } = req.params;
    currentLobbies.removeLobby(gameId)

    io.emit('lobby.update', { names: [], lobby: gameId })
    res.sendStatus(204);
  } catch (error) {
    logger.error(error);
    if (error instanceof HttpException) {
      res.status(error.statusCode).send({ message: error.message });
    } else {
      res.status(500).send({ message: 'Internal server error' });
    }
  }
});

export { router as GameRoutes };
