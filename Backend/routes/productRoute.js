const express = require("express");
const {
  createProduct,
  getAllProducts,
} = require("../controller/productController");

const router = express.Router();

router.route("/createproduct").post(createProduct);
router.route("/allproducts").get(getAllProducts);

module.exports = router;
