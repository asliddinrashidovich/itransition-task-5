const express = require('express');
const router = express.Router();
const generateBooks = require('../utils/fakerGenerator');

router.get('/', (req, res) => {
  const { seed = 42, locale = 'en-US', likes = 0, reviews = 0, page = 0, count = 20 } = req.query;

  const books = generateBooks({
    seed,
    locale,
    likes: parseFloat(likes),
    reviews: parseFloat(reviews),
    page: parseInt(page),
    count: parseInt(count),
  });

  res.json({ books });
});

module.exports = router;
