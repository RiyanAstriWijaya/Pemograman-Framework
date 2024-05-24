const router = require("express").Router();
const transaksi = require("../controllers/transaksi");

router.post("/", transaksi.creat);
router.get("/", transaksi.showAll);
router.get("/tampil/:id", transaksi.showById);
router.put("/:id", transaksi.update);
router.delete("/:id", transaksi.delete);

module.exports = router;
