const express = require("express");

const {
  getProducts,
  getPaginatedProducts,
  getFilteredProducts,
} = require("../controllers/products");

const router = express.Router();

router.get("/products", getProducts);
router.get("/products/pagination", getPaginatedProducts);
router.get("/products/filter", getFilteredProducts);

module.exports = router;
