const Genre = require("../models/genre.model");

exports.createGenre = async (req, res) => {
  try {
    const genre = await Genre.create(req.body);
    res.json(genre);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getGenres = async (req, res) => {
  try {
    const genres = await Genre.find();
    res.json(genres);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
