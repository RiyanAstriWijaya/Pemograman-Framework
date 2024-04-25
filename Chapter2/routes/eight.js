const router = require("express").Router();

router.get("/eight", function (_, res) {
  res.json({
    status: true,
    message: "Berhasil Diakses",
  });
});

router.post("/eight", (_, res) => {
  res.json({
    status: true,
    message: "eight Ini method POST",
  });
});

router.put("/eight", (_, res) => {
  res.json({
    status: true,
    message: "eight Ini method PUT",
  });
});

router.delete("/eight", (_, res) => {
  res.json({
    status: true,
    message: "eight Ini method DELETE",
  });
});

module.exports = router;
