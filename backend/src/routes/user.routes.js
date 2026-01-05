const router = require("express").Router();
const user = require("../controllers/user.controller");
const auth = require("../middleware/auth.middleware");

router.get("/", user.getAllUsers);
router.post("/register", user.register);
router.post("/login", user.login);
router.post("/google", user.googleLogin);
router.get("/profile", auth, user.getProfile);

module.exports = router;
