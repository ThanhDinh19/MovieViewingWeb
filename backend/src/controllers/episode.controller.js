const Episode = require("../models/episode.model");

exports.getEpisodesByMovie = async (req, res) => {
  const episodes = await Episode.find({ movieId: req.params.movieId });
  res.json(episodes);
};

exports.createEpisode = async (req, res) => {
  const episode = await Episode.create(req.body);
  res.json(episode);
};
