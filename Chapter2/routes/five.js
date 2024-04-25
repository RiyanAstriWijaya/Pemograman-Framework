const router = require("express").Router();

router.get("/five", function (_, res) {
  res.json({
    status: true,
    message: "Berhasil Diakses",
  });
});

router.post("/five", (_, res) => {
  res.json({
    status: true,
    message: "five Ini method POST",
  });
});

router.put("/five", (_, res) => {
  res.json({
    status: true,
    message: "five Ini method PUT",
  });
});

router.delete("/five", (_, res) => {
  res.json({
    status: true,
    message: "five Ini method DELETE",
  });
});

module.exports = router;
