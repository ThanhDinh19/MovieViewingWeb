const router = require("express").Router();
const genre = require("../controllers/genre.controller");

router.post("/", genre.createGenre);
router.get("/", genre.getGenres);

module.exports = router;

