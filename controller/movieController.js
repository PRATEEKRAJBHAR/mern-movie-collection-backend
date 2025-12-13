const axios = require("axios");
const Movie = require("../model/moviemodel");

exports.importMovies = async (req, res) => {
  try {
    const API_KEY = "2d84fb433f0a2732a9ea22850433646a";

    let movies = [];

    for (let page = 1; page <= 13; page++) {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${page}`
      );

      movies.push(...response.data.results);
    }

    // Format MongoDB structure
    const formatted = movies.map((m) => ({
      tmdb_id: m.id,
      title: m.title,
      overview: m.overview,
      poster_path: m.poster_path,
      release_date: m.release_date,
      vote_average: m.vote_average,
      popularity: m.popularity
    }));

    // Save to MongoDB
    await Movie.insertMany(formatted);

    res.json({
      success: true,
      total: formatted.length,
      message: "Movies successfully imported into MongoDB!"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// create movie
// controller/movieController.js (createMovie part)
exports.createMovie = async (req, res) => {
  try {
    const { title, overview, poster_path, release_date, vote_average, popularity } = req.body;

    const newMovie = new Movie({
      title,
      overview,
      poster_path,
      release_date,
      vote_average,
      popularity,
      is_custom: true,
      createdBy: req.user?.id || null
    });

    await newMovie.save();

    res.status(201).json({
      success: true,
      message: "Custom movie added successfully!",
      movie: newMovie
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// UPDATE a custom movie
exports.updateMovie = async (req, res) => {
  try {
    const movieId = req.params.id;

    const updatedMovie = await Movie.findByIdAndUpdate(
      movieId,
      req.body,
      { new: true }
    );

    if (!updatedMovie) {
      return res.status(404).json({ success: false, message: "Movie not found" });
    }

    res.json({
      success: true,
      message: "Movie updated successfully!",
      movie: updatedMovie
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// DELETE movie
exports.deleteMovie = async (req, res) => {
  try {
    const movieId = req.params.id;

    const deleted = await Movie.findByIdAndDelete(movieId);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Movie not found" });
    }

    res.json({
      success: true,
      message: "Movie deleted successfully!"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get all movies (Search + Sort + Pagination)
exports.getAllMovies = async (req, res) => {
  try {
    let {
      search = "",
      sortedField = "",
      sortedOrder = "asc",
      page = 1,
      limit = 10
    } = req.query;

    page = Number(page);
    limit = Number(limit);

    // Search
    let query = {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { overview: { $regex: search, $options: "i" } }
      ]
    };

    // Sorting
    let sort = {};
    if (sortedField) {
      sort[sortedField] = sortedOrder === "asc" ? 1 : -1;
    } else {
      sort.createdAt = -1;  
    }

    const total = await Movie.countDocuments(query);

    const movies = await Movie.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      success: true,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      movies
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
