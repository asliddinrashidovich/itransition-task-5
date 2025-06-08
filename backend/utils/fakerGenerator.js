const { Faker, en, de, ru } = require('@faker-js/faker');
const getSeededRandom = require('./seedRNG');
const generateTitle = require('./fakeTitles');

const locales = {
  'en-US': en,
  'de-DE': de,
  'ru-RU': ru,
};

function generateBooks({ seed, locale = 'en-US', likes = 0, reviews = 0, page = 0, count = 20 }) {
  const faker = new Faker({ locale: locales[locale] });

  // Count ni ham seed ga qo'shish — shu bilan har bir count uchun barqaror natija
  const combinedSeed = `${seed}${page}${count}`;
  faker.seed(+combinedSeed);

  // getSeededRandom ham shu combinedSeed yoki shunga o'xshash bilan chaqirish
  // (agar getSeededRandom faqat raqam qabul qilsa, parse qilishingiz mumkin)
  const rng = getSeededRandom(+combinedSeed);

  const books = [];
  const fractionalPart = reviews % 1;
  const fullReviewsCount = Math.floor(reviews);
  const fractionalReviewIndexes = [];

  for (let i = 0; i < count; i++) {
    if (rng() < fractionalPart) {
      fractionalReviewIndexes.push(i);
    }
  }

  for (let i = 0; i < count; i++) {
    const coverSeed = `${seed}-${page}-${i}`;
    const coverImage = `https://picsum.photos/seed/${coverSeed}/200/300`;

    const book = {
      index: page * count + i + 1,
      isbn: Math.floor(rng() * 9e12 + 1e12).toString(),
      title: generateTitle(locale, rng),
      authors: `${faker.person.firstName()} ${faker.person.lastName()}`,
      publisher: `${faker.company.name()}, ${faker.date.past({ years: 20 }).getFullYear()}`,
      coverImage,
      likes: Math.floor(likes),
      reviews: [],
    };

    for (let j = 0; j < fullReviewsCount; j++) {
      book.reviews.push({
        author: `${faker.person.firstName()} ${faker.person.lastName()}`,
        company: faker.company.name(),
        text: faker.lorem.sentence(),
      });
    }

    if (fractionalReviewIndexes.includes(i)) {
      book.reviews.push({
        author: `${faker.person.firstName()} ${faker.person.lastName()}`,
        company: faker.company.name(),
        text: faker.lorem.sentence(),
      });
    }

    books.push(book);
  }

  return books;
}

module.exports = generateBooks;
