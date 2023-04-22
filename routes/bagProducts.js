const express = require("express");

const {
  getBagProducts,
  addProductToBag,
  getUserProducts,
  deleteUserProduct,
  deleteAllUserProducts,
} = require("../controllers/bagProducts");

const router = express.Router();

router.get("/bagProducts", getBagProducts);
router.get("/bagProducts/:id", getUserProducts);
router.post("/bagProducts", addProductToBag);
router.delete("/bagProducts/delete", deleteUserProduct);
router.delete("/bagProducts", deleteAllUserProducts);

module.exports = router;
