//backend/src/routes/movie.routes.js
const router = require("express").Router();
const movie = require("../controllers/movie.controller");
const auth = require("../middleware/auth.middleware");
const upload = require("../middleware/upload");

router.get("/", movie.getAllMovies);
router.get("/search", movie.findMovies);
router.get("/:id", movie.getMovieById);

router.post(
    "/",
    auth,
    upload.fields([
        { name: "thumbnail", maxCount: 1 },
        { name: "video", maxCount: 1 },
    ]),
    movie.createMovie
);

router.put(
  "/:id",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  movie.updateMovie
);
router.delete("/:id", auth, movie.deleteMovie);


module.exports = router; 
