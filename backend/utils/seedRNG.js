const seedrandom = require('seedrandom');

function getSeededRandom(seed, page = 0, count = 20) {
  // count ni ham qo‘shamiz, shunda har bir count uchun RNG o‘zgargan bo‘ladi
  const combinedSeed = `${seed}-${page}-${count}`;
  return seedrandom(combinedSeed);
}

module.exports = getSeededRandom;
