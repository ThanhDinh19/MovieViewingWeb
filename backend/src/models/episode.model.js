const mongoose = require("mongoose");

const EpisodeSchema = new mongoose.Schema({
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
  episodeNumber: Number,
  title: String,
  videoUrl: String,
}, { timestamps: true });

module.exports = mongoose.model("Episode", EpisodeSchema);
