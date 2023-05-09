const express = require("express");

const {
  getProducts,
  getPaginatedProducts,
  getFilteredProducts,
  getSearchedProducts,
  getProductById,
} = require("../controllers/products");

const router = express.Router();

router.get("/products", getProducts);
router.get("/products/pagination", getPaginatedProducts);
router.get("/products/filter", getFilteredProducts);
router.get("/products/search", getSearchedProducts);
router.get("/products/:id", getProductById);

module.exports = router;
