const router = require("express").Router();
const genre = require("../controllers/genre.controller");

router.get("/for-movies", genre.getGenresForMovies);
router.post("/", genre.createGenre);
router.delete("/:id", genre.deleteGenre);
router.get("/", genre.getGenres);

router.put("/:id", genre.updateGenre);
module.exports = router;

