import { Router } from "express";

import { checkBody, logger } from "../utils/utils";
import { HttpException } from "../utils/exceptions";
import { currentLobbies } from "../domain/LobbyManager";

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
    checkBody(req, 'host');
    checkBody(req, 'gameId');

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

export { router as GameRoutes };
