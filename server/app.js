// Import required modules
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookiesParser from "cookie-parser";

// Import routes
import userRouter from "./routes/user.route.js";
import captainRouter from "./routes/captain.route.js";

// Load environment variables
dotenv.config();

// Initialize Express application
const app = express();

// Apply middlewares
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests
app.use(cookiesParser()); //Parse cookies so that we can add and read cookies

// Set up routes
app.use("/users", userRouter);

app.use("/captains", captainRouter);

// Export the configured app
export default app;
