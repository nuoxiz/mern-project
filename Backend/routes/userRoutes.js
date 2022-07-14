const express = require("express");
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser); // POST request add a new user
router.post("/login", loginUser); // POST request add a new user
router.get("/me", protect, getMe); // POST request add a new user

module.exports = router;
