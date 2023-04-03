const express = require("express");

const { getUsers, registerUser } = require("../controllers/users");

const router = express.Router();

router.get("/users", getUsers);
router.post("/users", registerUser);

module.exports = router;
