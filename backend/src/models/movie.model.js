const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  title: String,
  thumbnail: String,
  description: String,
  year: Number,
  type: { type: String, enum: ["single", "series"], default: "single" },
  genres: [{ type: mongoose.Schema.Types.ObjectId, ref: "Genre" }],
  rating: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  videoUrl: String,
}, { timestamps: true });

module.exports = mongoose.model("Movie", MovieSchema);
