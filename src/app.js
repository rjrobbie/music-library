const express = require('express');
const artistRouter = require('./routes/artist.js')

const app = express();

app.use(express.json());
app.use('/artists', artistRouter)

app.get('/', (req, res) => {
  res.status(200).send('Hello World');
});

module.exports = app;
