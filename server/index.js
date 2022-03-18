const express = require('express');
const http = require('http');

const { GameManager } = require('./domain/GameManager');

const app = express();
const server = http.createServer(app);
const currentGames = new GameManager();

app.get('/ping', (req, res) => {
  res.sendStatus(200);
});

app.get('/health', (req, res) => {
  res.sendStatus(200);
});

app.post('/game', (req, res) => {
  const gameId = currentGames.createGame();
  res.status(200).send({ code: gameId });
});

app.post('/game/{gameId}/players/{playerNick}', (req, res) => {
  const { gameId, playerNick } = req.params;
  const game = currentGames.getGame(gameId);
  const player = new Player(playerNick);
  game.addPlayer(player);
});

server.listen(8080, () => {
  console.log('listening on *:8080');
});
