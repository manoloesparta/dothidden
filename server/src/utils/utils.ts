export const randInt = (min, max) => min + Math.floor(Math.random() * max);

export const randString = (len) =>
  (Math.random() + 1)
    .toString(36)
    .substring(2, 2 + len)
    .toUpperCase();

export const logger = {
  error: (error) => console.error(JSON.stringify(error.stack)),
  info: (msg) => console.info(msg),
  debug: (msg) => console.debug(msg),
};
