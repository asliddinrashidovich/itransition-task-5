const { Faker, en, de, ja } = require('@faker-js/faker');
const getSeededRandom = require('./seedRNG');

const locales = {
  'en-US': en,
  'de-DE': de,
  'ja-JP': ja,
};

function generateBooks({ seed, locale = 'en-US', likes = 0, reviews = 0, page = 0, count = 20 }) {
  const faker = new Faker({ locale: locales[locale] });
  faker.seed(+`${seed}${page}`);

  const rng = getSeededRandom(seed, page);

  const books = [];

  for (let i = 0; i < count; i++) {
    const book = {
      index: page * count + i + 1,
      isbn: faker.number.int({ min: 1e12, max: 1e13 }).toString(),
      title: faker.lorem.words({ min: 2, max: 5 }),
      authors: `${faker.person.firstName()} ${faker.person.lastName()}`,
      publisher: `${faker.company.name()}, ${faker.date.past({ years: 20 }).getFullYear()}`,
      likes: Math.floor(likes),
      reviews: [],
    };

    // reviewlar soni fractional bo'lishi mumkin
    if (rng() < reviews % 1 || reviews >= 1) {
      const totalReviews = Math.floor(reviews);
      for (let j = 0; j < totalReviews; j++) {
        book.reviews.push({
          author: `${faker.person.firstName()} ${faker.person.lastName()}`,
          company: faker.company.name(),
          text: faker.lorem.sentence(),
        });
      }
    }

    books.push(book);
  }

  return books;
}

module.exports = generateBooks;
