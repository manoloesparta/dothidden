const express = require('express');
const http = require('http');
const cors = require('cors');
const morgan = require('morgan');
const { Server } = require('socket.io');

const { GameRoutes } = require('./game');
const { PlayerRoutes } = require('./players');

const format = '[:date[clf]] ":method :url" :status - ":user-agent"';

const createApp = () => {
  const app = express();

  app.get('/health', (req, res) => res.sendStatus(200));

  app.use(cors());
  app.use(express.json());
  app.use(morgan(format));

  app.use(GameRoutes);
  app.use(PlayerRoutes);

  const server = http.createServer(app);
  const io = new Server(server);

  io.on('connection', (socket) => {
    socket.on('update-location', undefined); // pending
  });

  return server;
};

module.exports = { createApp };
