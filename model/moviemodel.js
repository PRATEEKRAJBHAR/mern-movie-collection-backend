const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  tmdb_id: { type: Number, default: null },
  title: { type: String, required: true },
  overview: String,
  poster_path: String,
  release_date: String,
  vote_average: Number,
  popularity: Number,
  is_custom: { type: Boolean, default: false },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Movieregister", default: null }
}, { timestamps: true });

module.exports = mongoose.model("Movie", movieSchema);
