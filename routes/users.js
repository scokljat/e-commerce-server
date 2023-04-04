const express = require("express");

const {
  getUsers,
  registerUser,
  loginUser,
  getUserById,
} = require("../controllers/users");

const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
