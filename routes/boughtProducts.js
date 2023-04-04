const express = require("express");

const {
  getBoughtProducts,
  addBoughtProduct,
  filteredBoughtProducts,
} = require("../controllers/boughtProducts");

const router = express.Router();

router.get("/boughtProducts", getBoughtProducts);
router.get("/boughtProducts/:id", filteredBoughtProducts);
router.post("/boughtProducts", addBoughtProduct);

module.exports = router;
