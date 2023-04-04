const express = require("express");

const {
  getBoughtProducts,
  addBoughtProduct,
  getUserProducts,
} = require("../controllers/boughtProducts");

const router = express.Router();

router.get("/boughtProducts", getBoughtProducts);
router.get("/boughtProducts/:id", getUserProducts);
router.post("/boughtProducts", addBoughtProduct);

module.exports = router;
