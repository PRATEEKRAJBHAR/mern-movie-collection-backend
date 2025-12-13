// routes/movieRoutes.js
const express = require("express");
const router = express.Router();
const {
  importMovies,
  createMovie,
  getAllMovies,
  updateMovie,
  deleteMovie
} = require("../controller/movieController");
const { registerRoute } = require("../controller/movieRegistercontroller");
const { loginRoutes } = require("../controller/movieLogincontroller");
const { movieAuth } = require('../Middleware/movieAuthmiddleware');
const { checkAdmin } = require('../Middleware/checkAdmin');

//  register & login
router.post("/register", registerRoute);
router.post("/login", loginRoutes);

// Import TMDB movies


router.get("/import-movies", movieAuth, checkAdmin, importMovies);

// Protected routes
router.get("/movies", movieAuth, getAllMovies);
router.post("/create-movie", movieAuth, checkAdmin, createMovie);
router.put("/update/:id", movieAuth, checkAdmin, updateMovie);
router.delete("/delete/:id", movieAuth, checkAdmin, deleteMovie);

module.exports = router;




// const express = require("express");
// const router = express.Router();

// const {
//   getAllMovies,
//   searchMovies,
//   sortMovies,
//   createMovie,
//   updateMovie,
//   deleteMovie,
//   importMovies
// } = require("../controller/movieController");

// const { movieAuth } = require("../Middleware/movieAuthmiddleware");
// const { checkAdmin } = require("../Middleware/checkAdmin");

// // ================= MOVIES =================
// router.post("/register", registerRoute);
// router.post("/login", loginRoutes);
// // Get all movies (pagination only)
// router.get("/movies", movieAuth, getAllMovies);

// // Search movies
// router.get("/movies/search", movieAuth, searchMovies);

// // Sort movies
// router.get("/movies/sorted", movieAuth, sortMovies);

// // Create movie (admin)
// router.post("/movies", movieAuth, checkAdmin, createMovie);

// // Update movie (admin)
// router.put("/movies/:id", movieAuth, checkAdmin, updateMovie);

// // Delete movie (admin)
// router.delete("/movies/:id", movieAuth, checkAdmin, deleteMovie);

// // Import TMDB (admin)
// router.get("/import-movies", movieAuth, checkAdmin, importMovies);

// module.exports = router;
