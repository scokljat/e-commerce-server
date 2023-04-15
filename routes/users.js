const express = require("express");
const {
  getUsers,
  registerUser,
  loginUser,
  getUserById,
  editUser,
  editUserPassword,
} = require("../controllers/users");

const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.put("/users/edit", editUser);
router.put("/users/edit-password", editUserPassword);
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
