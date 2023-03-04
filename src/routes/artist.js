const express = require('express');
const router = express.Router();
const { createArtist } = require('../controllers/artist.js')

router.post('/', createArtist)

module.exports = router;