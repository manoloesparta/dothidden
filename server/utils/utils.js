const randInt = (min, max) => min + Math.floor(Math.random() * max);

const randString = (len) => (Math.random() + 1).toString(36).substring(2, 2 + len).toUpperCase();

module.exports = { randInt, randString };
