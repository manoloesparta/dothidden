import { Router } from 'express';

import { checkPathParams, handleRequestExceptions } from '../utils/requests';
import { LobbyManager } from '../domain/LobbyManager';

const router: Router = Router();

const currentLobbies: LobbyManager = LobbyManager.getInstance();

router.post('/game/:gameId/players/:playerNick', (req, res) => {
  const io = req.app.get('socketService');
  handleRequestExceptions(res, () => {
    checkPathParams(req, 'gameId', 'playerNick');

    const { gameId, playerNick } = req.params;
    const lobby = currentLobbies.getLobby(gameId);
    lobby.addPlayer(playerNick);

    io.emit('lobby.update', { names: lobby.getPlayerNames(), lobby: lobby.lobbyId });
    res.sendStatus(200);
  })
});

router.delete('/game/:gameId/players/:playerNick', (req, res) => {
  const io = req.app.get('socketService');
  handleRequestExceptions(res, () => {
    checkPathParams(req, 'gameId', 'playerNick');

    const { gameId, playerNick } = req.params;
    const lobby = currentLobbies.getLobby(gameId);
    lobby.removePlayer(playerNick);

    io.emit('lobby.update', { names: lobby.getPlayerNames(), lobby: lobby.lobbyId });
    res.sendStatus(200);
  })
});

router.get('/game/:gameId/players/:playerNick', (req, res) => {
  handleRequestExceptions(res, () => {
    checkPathParams(req, 'gameId', 'playerNick');

    const { gameId, playerNick } = req.params;
    const lobby = currentLobbies.getLobby(gameId);
    const player = lobby.getPlayer(playerNick);

    res.status(200).send({ player: player.name });
  })
});

router.get('/game/:gameId/players', (req, res) => {
  handleRequestExceptions(res, () => {
    checkPathParams(req, 'gameId');

    const { gameId } = req.params;
    const lobby = currentLobbies.getLobby(gameId);

    res.status(200).send({ names: lobby.getPlayerNames() });
  })
});

export { router as PlayerRoutes };
