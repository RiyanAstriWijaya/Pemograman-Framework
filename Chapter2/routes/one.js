const router = require("express").Router();

router.get("/one", function (_, res) {
  res.json({
    status: true,
    message: "Berhasil Diakses",
  });
});

router.post("/one", (_, res) => {
  res.json({
    status: true,
    message: "one Ini method POST",
  });
});

router.put("/one", (_, res) => {
  res.json({
    status: true,
    message: "one Ini method PUT",
  });
});

router.delete("/one", (_, res) => {
  res.json({
    status: true,
    message: "one Ini method DELETE",
  });
});

module.exports = router;
