const router = require("express").Router();
const product = require("../controllers/product");

router.post("/", product.creat);
router.get("/", product.showAll);
router.get("/tampil/:id", product.showById);
router.put("/:id", product.update);
router.delete("/:id", product.delete);
router.get("/product-favorit", product.productFavorit);
router.get("/product-kurang", product.productKurangLima);

module.exports = router;
