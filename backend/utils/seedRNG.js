const seedrandom = require('seedrandom');

function getSeededRandom(seed) {
  return seedrandom(seed);
}

module.exports = getSeededRandom;
