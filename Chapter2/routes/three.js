const router = require("express").Router();

router.get("/three", function (_, res) {
  res.json({
    status: true,
    message: "Berhasil Diakses",
  });
});

router.post("/three", (_, res) => {
  res.json({
    status: true,
    message: "three Ini method POST",
  });
});

router.put("/three", (_, res) => {
  res.json({
    status: true,
    message: "three Ini method PUT",
  });
});

router.delete("/three", (_, res) => {
  res.json({
    status: true,
    message: "three Ini method DELETE",
  });
});

module.exports = router;
