const router = require("express").Router();

router.get("/six", function (_, res) {
  res.json({
    status: true,
    message: "Berhasil Diakses",
  });
});

router.post("/six", (_, res) => {
  res.json({
    status: true,
    message: "six Ini method POST",
  });
});

router.put("/six", (_, res) => {
  res.json({
    status: true,
    message: "six Ini method PUT",
  });
});

router.delete("/six", (_, res) => {
  res.json({
    status: true,
    message: "six Ini method DELETE",
  });
});

module.exports = router;
