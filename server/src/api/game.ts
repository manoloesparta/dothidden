import { Router } from 'express';

import { checkBody, checkPathParams, handleRequestExceptions } from '../utils/requests';
import { LobbyManager } from '../domain/LobbyManager';
import { SocketService } from '../sockets';

const router: Router = Router();

const currentLobbies: LobbyManager = LobbyManager.getInstance();

router.post('/game', (req, res) => {
  handleRequestExceptions(res, () => {
    checkBody(req, 'host');

    const lobbyId = currentLobbies.createLobby(req.body.host);

    res.status(200).send({ code: lobbyId });
  })
});

router.get('/game/:gameId/host', (req, res) => {
  handleRequestExceptions(res, () => {
    checkPathParams(req, 'gameId');

    const { gameId } = req.params;
    const lobby = currentLobbies.getLobby(gameId);

    res.status(200).send({ host: lobby.host });
  })
});

router.delete('/game/:gameId', (req, res) => {
  const io: SocketService = req.app.get('socketService');
  handleRequestExceptions(res, () => {
    checkPathParams(req, 'gameId');

    const { gameId } = req.params;
    currentLobbies.removeLobby(gameId)

    io.emit('lobby.update', { names: [], lobby: gameId })
    res.sendStatus(204);
  })
});

export { router as GameRoutes };
