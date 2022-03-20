const { BadRequestException } = require('./exceptions');

const randInt = (min, max) => min + Math.floor(Math.random() * max);

const randString = (len) => (Math.random() + 1).toString(36).substring(2, 2 + len).toUpperCase();

const checkPathParams = (request, ...params) => {
  params.forEach((param) => {
    if (!(param in request.params)) {
      throw new BadRequestException('Missing path parameters');
    }
  });
};

const checkBody = (request, ...keys) => {
  keys.forEach((key) => {
    if (!(key in request.body)) {
      throw new BadRequestException('Missing body parameters');
    }
  });
};

module.exports = {
  randInt, randString, checkPathParams, checkBody,
};
