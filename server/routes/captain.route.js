// Import required modules
import express from "express";
import { body } from "express-validator";

// Import controller functions
import {
  registerCaptainFun,
  loginCaptainFun,
  logoutCaptainFun,
  getCaptainProfileFun,
} from "../controllers/captain.controller.js";

// Import authentication middleware
import { authCaptain } from "../middlewares/auth.middleware.js";

// Initialize router
const router = express.Router();

// Define user routes

// Register a new user
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("firstName")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("lastName")
      .isLength({ min: 3 })
      .withMessage("Last name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Color must be at least 3 characters long"),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("Plate must be at least 3 characters long"),
    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Capacity must be at least 1"),
    body("vehicle.vehicleType")
      .isIn(["car", "motorcycle", "auto"])
      .withMessage("Invalid vehicle type"),
  ],
  registerCaptainFun
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
  loginCaptainFun
);

// Apply authUser middleware to all routes below this line
router.use(authCaptain);

// Protected routes
router.get("/logout", logoutCaptainFun);
router.get("/profile", getCaptainProfileFun);

// Export router
export default router;
