// Import required modules
import express from "express";
import { body } from "express-validator";

// Import controller functions
import {
  registerFun,
  loginFun,
  getProfileFun,
  logoutFun,
} from "../controllers/user.controller.js";

// Import authentication middleware
import { authUser } from "../middlewares/auth.middleware.js";

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

// Apply authUser middleware to all routes below this line
router.use(authUser);

// Protected routes
router.get("/logout", logoutFun);
router.get("/profile", getProfileFun);

// Export router
export default router;
