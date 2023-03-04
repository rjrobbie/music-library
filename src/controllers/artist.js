function createArtist(req, res) {
    res.status(201).send('Artist created successfully');
}

module.exports = {
    createArtist
}