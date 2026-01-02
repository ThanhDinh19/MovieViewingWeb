const router = require("express").Router();
const ep = require("../controllers/episode.controller");
const auth = require("../middleware/auth.middleware");

router.get("/:movieId", ep.getEpisodesByMovie);
router.post("/", auth, ep.createEpisode);

module.exports = router;
