// Import required modules
const express = require("express");
const { body } = require("express-validator");

// Import controller functions
const {
  registerFun,
  loginFun,
  getProfileFun,
} = require("../controllers/user.controller");

// Import authentication middleware
const { authUser } = require("../middlewares/auth.middleware");

// Initialize router
const router = express.Router();

// Define user routes

// Register a new user
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("firstName")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters"),
    body("lastName")
      .isLength({ min: 3 })
      .withMessage("Last name must be at least 3 characters"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters"),
  ],
  registerFun
);

// Log in a user
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters"),
  ],
  loginFun
);

// Get user profile (protected route)
router.get("/profile", authUser, getProfileFun);

// Export router
module.exports = router;
