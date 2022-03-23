const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const morgan = require('morgan');

const { GameRoutes } = require('./game');
const { PlayerRoutes } = require('./players');

const format = '[:date[clf]] ":method :url" :status - ":user-agent"';

const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(morgan(format));

  app.use(GameRoutes);
  app.use(PlayerRoutes);

  app.get('/health', (req, res) => res.sendStatus(200));

  const server = http.createServer(app);
  const io = new Server(server);

  io.on('connection', (socket) => {
    socket.on('update-location', undefined); // pending
  });

  return server;
};

module.exports = { createApp };
