import express, { Express } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import http, { Server } from 'http'

import { GameRoutes } from './game';
import { PlayerRoutes } from './players';
import { SocketService } from '../sockets'

const format = '[:date[clf]] ":method :url" :status - ":user-agent"';

export const createApp = () => {
  const app: Express = express();
  const server: Server = http.createServer(app);

  app.get('/health', (req, res) => res.sendStatus(200));

  app.use(cors());
  app.use(express.json());
  app.use(morgan(format));

  app.use(GameRoutes);
  app.use(PlayerRoutes);

  app.set('socket-service', new SocketService(server));

  return server;
};
