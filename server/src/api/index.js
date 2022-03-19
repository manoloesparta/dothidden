const express = require('express');
const cors = require('cors');

const { GameRoutes } = require('./game');
const { PlayerRoutes } = require('./players');

const createApp = () => {
  const app = express();

  app.get('/health', (req, res) => res.sendStatus(200));

  app.use(express.json());
  app.use(cors());

  app.use(GameRoutes);
  app.use(PlayerRoutes);

  return app;
};

module.exports = { createApp };
