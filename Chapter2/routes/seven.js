const router = require("express").Router();

router.get("/seven", function (_, res) {
  res.json({
    status: true,
    message: "Berhasil Diakses",
  });
});

router.post("/seven", (_, res) => {
  res.json({
    status: true,
    message: "seven Ini method POST",
  });
});

router.put("/seven", (_, res) => {
  res.json({
    status: true,
    message: "seven Ini method PUT",
  });
});

router.delete("/seven", (_, res) => {
  res.json({
    status: true,
    message: "seven Ini method DELETE",
  });
});

module.exports = router;
