const Movie = require("../models/movie.model");
const Episode = require("../models/episode.model");

exports.getAllMovies = async (req, res) => {
  try {

    const movies = await Movie.find().populate("genres");;

    res.json(movies);
  } catch (err) {
    console.error("Error getting movies:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.findMovies = async (req, res) => {
  try {
    const { search } = req.query;

    let query = {};
    query = {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ]
    };
    const movies = await Movie.find(query);
    res.json(movies);
  }
  catch (err) {
    console.error("Error finding movies:", err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getMovieById = async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.json(movie);
};

const mongoose = require("mongoose");

exports.createMovie = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const { title, year, description } = req.body;

    let genres = req.body.genres;

    const thumbnail = req.files?.thumbnail?.[0];
    const video = req.files?.video?.[0];

    if (!title || !year || !genres || !thumbnail || !video) {
      return res.status(400).json({ message: "Thiếu dữ liệu bắt buộc" });
    }

    genres = Array.isArray(genres) ? genres : [genres];

    const validGenres = genres.filter(id =>
      mongoose.Types.ObjectId.isValid(id)
    );

    if (validGenres.length === 0) {
      return res.status(400).json({
        message: "Genre ID không hợp lệ",
        genres
      });
    }

    const movie = await Movie.create({
      title,
      year: Number(year),
      description,
      genres: validGenres,
      thumbnail: thumbnail.path,
      videoUrl: video.path
    });

    res.status(201).json(movie);
  } catch (error) {
    console.error("CREATE MOVIE ERROR:", error);
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }
};


exports.updateMovie = async (req, res) => {
  try {
    const { title, year, description } = req.body;
    let genres = req.body.genres || req.body["genres[]"];

    genres = Array.isArray(genres) ? genres : [genres];

    const updateData = {
      title,
      year: Number(year),
      description,
      genres
    };

    if (req.files?.thumbnail) {
      updateData.thumbnail = req.files.thumbnail[0].path;
    }

    if (req.files?.video) {
      updateData.videoUrl = req.files.video[0].path;
    }

    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};


exports.deleteMovie = async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
