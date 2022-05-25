import { logger } from './utils';
import { BadRequestException, HttpException } from './exceptions';
import { Response } from 'express';

export const checkPathParams = (request, ...params) => {
  params.forEach((param) => {
    if (!(param in request.params)) {
      throw new BadRequestException('Missing path parameters');
    }
  });
};

export const checkBody = (request, ...keys) => {
  keys.forEach((key) => {
    if (!(key in request.body)) {
      throw new BadRequestException('Missing body parameters');
    }
  });
};

export const handleRequestExceptions = (res: Response, callback: any) => {
  try {
    callback()
  } catch (error) {
    logger.error(error);
    if (error instanceof HttpException) {
      res.status(error.statusCode).send({ message: error.message });
    } else {
      res.status(500).send({ message: 'Internal server error' });
    }
  }
};

export const handleSocketException = (data: any, callback: any) => {
  try {
    callback(data);
  } catch(error) {
    logger.error(error);
  }
};
