const express = require('express');
const cors = require('cors');
const booksRoute = require('./routes/books');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/books', booksRoute);

module.exports = app;
