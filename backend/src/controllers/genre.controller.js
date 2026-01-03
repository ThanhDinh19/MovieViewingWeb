const Genre = require("../models/genre.model");

exports.createGenre = async (req, res) => {
  try {
    const genreName = req.body;
    if(!genreName){
      return res.status(400).json({ error: "Tên thể loại không được để trống" });
    }
    const genre = await Genre.create(genreName);
    res.status(201).json(genre);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteGenre = async (req, res) => {
  try {
    const { id } = req.params;    

    await Genre.findByIdAndDelete(id);
    res.json({ message: "Thể loại đã được xóa thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateGenre = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const genre = await Genre.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    res.json(genre);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.getGenresForMovies = async (req, res) => {
  try {
    const genres = await Genre.find();
    res.json(genres);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getGenres = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  const total = await Genre.countDocuments();
  const genres = await Genre.find()
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  res.json({
    data: genres,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    totalItems: total
  });
};
