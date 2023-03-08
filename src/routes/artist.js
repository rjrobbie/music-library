const express = require('express');
const router = express.Router();
const { createArtist } = require('../controllers/artist.js')
const artistController = require('../controllers/artist.js')

router.post('/', createArtist)

router.get('/', artistController.readArtist)

router.get('/:id', artistController.getArtistById);


module.exports = router;