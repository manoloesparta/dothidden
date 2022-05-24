import { Router } from 'express';

import { checkPathParams, handleRequestExceptions } from '../utils/requests';
import { LobbyManager } from '../domain/LobbyManager';
import { Lobby } from '../domain/Lobby';
import { SocketService } from '../sockets';

const router: Router = Router();

const currentLobbies: LobbyManager = LobbyManager.getInstance();

router.post('/game/:gameId/players/:playerNick', (req, res) => {
  const io: SocketService = req.app.get('socket-service');
  handleRequestExceptions(res, () => {
    checkPathParams(req, 'gameId', 'playerNick');

    const { gameId, playerNick } = req.params;
    const lobby: Lobby = currentLobbies.getLobby(gameId);
    lobby.addPlayer(playerNick);

    io.roomEmit(lobby.lobbyId, 'lobby.update', {names: lobby.getPlayerNames()})
    res.sendStatus(200);
  })
});

router.delete('/game/:gameId/players/:playerNick', (req, res) => {
  const io: SocketService = req.app.get('socket-service');
  handleRequestExceptions(res, () => {
    checkPathParams(req, 'gameId', 'playerNick');

    const { gameId, playerNick } = req.params;
    const lobby = currentLobbies.getLobby(gameId);
    lobby.removePlayer(playerNick);

    io.roomEmit(lobby.lobbyId, 'lobby.update', {names: lobby.getPlayerNames()})
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
