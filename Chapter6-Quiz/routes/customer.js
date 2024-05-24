const router = require("express").Router();
const customer = require("../controllers/customer");

router.post("/", customer.creat);
router.get("/", customer.showAll);
router.get("/tampil/:id", customer.showById);
router.put("/:id", customer.update);
router.delete("/:id", customer.delete);
router.get("/total-pembelian", customer.customerBeli);
router.get("/top-customer", customer.customerTop);
router.get("/rata-rata-umur", customer.averageAge);
router.get("/top-gender", customer.customerGender);

module.exports = router;
