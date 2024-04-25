const router = require("express").Router();

router.get("/nine", function (_, res) {
  res.json({
    status: true,
    message: "Berhasil diakses",
  });
});

router.post("/nine", (_, res) => {
  res.json({
    status: true,
    message: "nine Ini method POST",
  });
});

router.put("/nine", (_, res) => {
  res.json({
    status: true,
    message: "nine Ini method PUT",
  });
});

router.delete("/nine", (_, res) => {
  res.json({
    status: true,
    message: "nine Ini method DELETE",
  });
});

module.exports = router;
