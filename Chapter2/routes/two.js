const router = require("express").Router();

router.get("/two", function (_, res) {
  res.json({
    status: true,
    message: "Berhasil Diakses",
  });
});

router.post("/two", (_, res) => {
  res.json({
    status: true,
    message: "two Ini method POST",
  });
});

router.put("/two", (_, res) => {
  res.json({
    status: true,
    message: "two Ini method PUT",
  });
});

router.delete("/two", (_, res) => {
  res.json({
    status: true,
    message: "two Ini method DELETE",
  });
});

module.exports = router;
