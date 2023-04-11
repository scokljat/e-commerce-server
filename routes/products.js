const express = require("express");

const {
  getProducts,
  getPaginatedProducts,
  getFilteredProducts,
  getProductById,
} = require("../controllers/products");

const router = express.Router();

router.get("/products", getProducts);
router.get("/products/pagination", getPaginatedProducts);
router.get("/products/filter", getFilteredProducts);
router.get("/products/:id", getProductById);

module.exports = router;
