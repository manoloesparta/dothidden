const express = require('express');
const http = require('http');
const cors = require('cors');
const morgan = require('morgan');

const { GameRoutes } = require('./game');
const { PlayerRoutes } = require('./players');
const { SocketService } = require('../sockets');

const format = '[:date[clf]] ":method :url" :status - ":user-agent"';

const createApp = () => {
  const app = express();
  const server = http.createServer(app);

  app.get('/health', (req, res) => res.sendStatus(200));

  app.use(cors());
  app.use(express.json());
  app.use(morgan(format));

  app.use(GameRoutes);
  app.use(PlayerRoutes);

  app.set('socketService', new SocketService(server));

  return server;
};

module.exports = { createApp };
