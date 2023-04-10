const express = require("express");

const {
  getBagProducts,
  addProductToBag,
  getUserProducts,
  deleteUserProduct,
} = require("../controllers/bagProducts");

const router = express.Router();

router.get("/bagProducts", getBagProducts);
router.get("/bagProducts/:id", getUserProducts);
router.post("/bagProducts", addProductToBag);
router.delete("/bagProducts/delete", deleteUserProduct);

module.exports = router;
