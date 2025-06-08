function stringToIntSeed(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 31 + str.charCodeAt(i)) & 0xffffffff; // 32-bit integer
    }
    return Math.abs(hash);
}

module.exports = stringToIntSeed