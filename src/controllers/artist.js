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

  const deleteArtist = async (req, res) => {
    const { id } = req.params
  
    try {
      const { rows } = await db.query('DELETE FROM Artists WHERE id = $1 RETURNING *', [id])
  
      if (rows.length === 0) {
        res.status(404).json({ message: `artist ${id} does not exist` })
      } else {
        res.json(rows[0])
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }


module.exports = {
    readArtist,
    createArtist,
    getArtistById,
    putArtist,
    deleteArtist
}
