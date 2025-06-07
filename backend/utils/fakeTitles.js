const titleParts = {
  'en-US': {
    adjectives: ['Silent', 'Dark', 'Ancient', 'Lost', 'Secret', 'Hidden'],
    nouns: ['Forest', 'Island', 'Journey', 'World', 'Night', 'River'],
    connectors: ['of', 'in', 'and', 'to']
  },
  'de-DE': {
    adjectives: ['Stille', 'Dunkle', 'Alte', 'Verlorene', 'Geheime', 'Versteckte'],
    nouns: ['Wald', 'Insel', 'Reise', 'Welt', 'Nacht', 'Fluss'],
    connectors: ['von', 'im', 'und', 'zu']
  },
  'ru-RU': {
    adjectives: ['Тихий', 'Тёмный', 'Древний', 'Потерянный', 'Секретный', 'Скрытый'],
    nouns: ['Лес', 'Остров', 'Путешествие', 'Мир', 'Ночь', 'Река'],
    connectors: ['из', 'в', 'и', 'к']
  }
};

function generateTitle(locale, rng) {
  const parts = titleParts[locale] || titleParts['en-US'];
  const adj = parts.adjectives[Math.floor(rng() * parts.adjectives.length)];
  const noun = parts.nouns[Math.floor(rng() * parts.nouns.length)];
  const conn = parts.connectors[Math.floor(rng() * parts.connectors.length)];

  const variants = [
    `${adj} ${noun}`,
    `${adj} ${conn} ${noun}`,
    `${noun} ${conn} ${adj}`,
  ];

  return variants[Math.floor(rng() * variants.length)];
}

module.exports = generateTitle