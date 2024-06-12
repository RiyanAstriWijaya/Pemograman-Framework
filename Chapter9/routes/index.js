const router = require("express").Router();
const auth = require("../controllers/auth");
router.post("/register", auth.createUser);
router.get("/verify-email", auth.verifyEmail);

module.exports = router;
