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



router.get("/import-movies", movieAuth, checkAdmin, importMovies);

// Protected routes
router.get("/movies", movieAuth, getAllMovies);
router.post("/create-movie", movieAuth, checkAdmin, createMovie);
router.put("/update/:id", movieAuth, checkAdmin, updateMovie);
router.delete("/delete/:id", movieAuth, checkAdmin, deleteMovie);

module.exports = router;



