const db = require('../db/index.js')

const readArtist = async (req, res) => {

    try {
      const result = await db.query('SELECT * FROM Artists');
      res.status(200).json(result.rows)
    } catch (err) {
      res.status(500).json(err.message)
    }
}

const createArtist = async (req, res) => {
    const { name, genre } = req.body
  
    try {
      const { rows: [ artist ] } = await db.query(`INSERT INTO Artists (name, genre) VALUES ($1, $2) RETURNING *`, [name, genre])
      res.status(201).json(artist)
    } catch (err) {
      res.status(500).json(err.message)
    }
  }

  const getArtistById = async (req, res) => {
    try {
      const { id } = req.params
      const { rows: [ artist ] } = await db.query('SELECT * FROM Artists WHERE id = $1', [ id ])
  
      if (!artist) {
        return res.status(404).json({ message: `artist ${id} does not exist` })
      }
  
      res.status(200).json(artist)
    } catch (err) {
      res.status(500).json(err.message)
    }
  }

  const putArtist = async (req, res) => {
    const { id } = req.params
    const { name, genre } = req.body
  
    try {
      const { rows: [ artist ] } = await db.query('UPDATE Artists SET name = $1, genre = $2 WHERE id = $3 RETURNING *', [ name, genre, id ])
  
      if (!artist) {
        return res.status(404).json({ message: `artist ${id} does not exist` })
      }
  
      res.status(200).json(artist)
    } catch (err) {
      console.log(err)
      res.status(500).json(err.message)
    }
  }



module.exports = {
    readArtist,
    createArtist,
    getArtistById,
    putArtist
}
