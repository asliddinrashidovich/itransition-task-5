const seedrandom = require('seedrandom');

function getSeededRandom(seed, page = 0) {
  const combinedSeed = `${seed}-${page}`;
  return seedrandom(combinedSeed);
}

module.exports = getSeededRandom;
