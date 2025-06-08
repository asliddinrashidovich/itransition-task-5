const { Faker, en, de, ru, fr, ja } = require('@faker-js/faker');
const seedrandom = require('seedrandom');
const generateTitle = require('./fakeTitles'); // Sizning title generator

const locales = {
  'en-US': en,
  'de-DE': de,
  'ru-RU': ru,
  'fr-FR': fr,
  'ja-JP': ja,
};

// Seed uchun stringni integer ga o‘zgartiruvchi funksiya
function stringToIntSeed(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) & 0xffffffff;
  }
  return Math.abs(hash);
}

// Har bir kitob uchun seed yaratish
function getBookSeed(seed, page, index) {
  return `${seed}-${page}-${index}`;
}

function generateBooks({ seed, locale = 'en-US', likes = 0, reviews = 0, page = 0, count = '20' }) {
  // Seed lokalizatsiya va sahifa raqamiga qarab qat'iy belgilanadi
  const fakerLocale = locales[locale] || en;
  const faker = new Faker({ locale: fakerLocale });

  // Natijalar arrayi
  const books = [];

  // Reviews uchun butun va fractional qismlar
  const fullReviewsCount = Math.floor(reviews);
  const fractionalReviewProbability = reviews % 1;

  // Har bir kitob uchun generatsiya qilamiz
  for (let i = 0; i < count; i++) {
    const bookSeed = getBookSeed(seed, page, i);
    const rng = seedrandom(bookSeed);  // Har bir kitob uchun o‘z RNG

    // Faker uchun integer seed (har doim bir xil bo‘lsin)
    const intSeed = stringToIntSeed(bookSeed);
    faker.seed(intSeed);

    // Kitob ma'lumotlarini yaratayapmiz (faqat seed + page + index ga bog‘liq)
    const title = generateTitle(locale, rng); // Sizning title generator, faqat rng bilan ishlashi kerak!
    const authors = `${faker.person.firstName()} ${faker.person.lastName()}`;
    const publisher = `${faker.company.name()}, ${faker.date.past({ years: 20 }).getFullYear()}`;
    const isbn = Math.floor(rng() * 9e12 + 1e12).toString();
    const coverImage = `https://picsum.photos/seed/${bookSeed}/200/300`;

    // Likes va reviews alohida boshqariladi:
    const bookLikes = likes;  // Fractional, masalan 3.7
    // Reviews soni fractional probabilitga bog‘liq
    let bookReviewsCount = fullReviewsCount;
    if (rng() < fractionalReviewProbability) {
      bookReviewsCount += 1;
    }

    // Reviews massivini generatsiya qilamiz
    const reviewsArr = [];
    for (let j = 0; j < bookReviewsCount; j++) {
      // Har review uchun ham seed random bilan deterministic generatsiya qilamiz
      const reviewSeed = `${bookSeed}-review-${j}`;
      const reviewRng = seedrandom(reviewSeed);
      faker.seed(stringToIntSeed(reviewSeed));

      reviewsArr.push({
        author: `${faker.person.firstName()} ${faker.person.lastName()}`,
        company: faker.company.name(),
        text: faker.lorem.sentence(),
      });
    }

    books.push({
      index: page * count + i + 1,
      isbn,
      title,
      authors,
      publisher,
      coverImage,
      likes: bookLikes,
      reviews: reviewsArr,
    });
  }

  return books;
}

module.exports = generateBooks;
