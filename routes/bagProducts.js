const express = require("express");

const {
  getBagProducts,
  addProductToBag,
  getUserProducts,
  deleteUserProduct,
  deleteAllUserProducts,
  increaseProductInBag,
  decreaseProductInBag,
  payProducts,
} = require("../controllers/bagProducts");

const router = express.Router();

router.get("/bagProducts", getBagProducts);
router.get("/bagProducts/:id", getUserProducts);
router.post("/bagProducts", addProductToBag);
router.post("/payment", payProducts);
router.put("/bagProducts/increase", increaseProductInBag);
router.put("/bagProducts/decrease", decreaseProductInBag);
router.delete("/bagProducts/delete", deleteUserProduct);
router.delete("/bagProducts", deleteAllUserProducts);

module.exports = router;
