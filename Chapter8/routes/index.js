const router = require("express").Router();
const auth = require("../controller/auth");
const authorization = require("../middleware/authorization");
// let refreshTokens = [];
router.get("/", (req, res) => {
  res.json({
    status: true,
    message: "Welcome to my api",
  });
});
router.post("/login", auth.login);
router.get("/saya", auth.saya);
router.post("/registrasi", auth.registration);
router.post("/loginSIMAT", auth.loginSimat);
router.get("/khusus-mahasiswa", authorization(["mhs"]), (req, res, next) => {
  try {
    return res.json({
      status: true,
      message: "Anda berhasil masuk",
      data: req.user,
    });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
