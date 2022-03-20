const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { GameRoutes } = require('./game');
const { PlayerRoutes } = require('./players');

const format = '[:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] - ":user-agent"';

const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(morgan(format));

  app.use(GameRoutes);
  app.use(PlayerRoutes);

  app.get('/health', (req, res) => res.sendStatus(200));

  return app;
};

module.exports = { createApp };
