const router = require("express").Router();

router.get("/four", function (_, res) {
  res.json({
    status: true,
    message: "Berhasil Diakses",
  });
});

router.post("/four", (_, res) => {
  res.json({
    status: true,
    message: "four Ini method POST",
  });
});

router.put("/four", (_, res) => {
  res.json({
    status: true,
    message: "four Ini method PUT",
  });
});

router.delete("/four", (_, res) => {
  res.json({
    status: true,
    message: "four Ini method DELETE",
  });
});

module.exports = router;
