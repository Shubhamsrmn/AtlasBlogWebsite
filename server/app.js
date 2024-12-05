// Import required modules
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookiesParser = require("cookie-parser");

// Import routes
const userRouter = require("./routes/user.route");

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

// Export the configured app
module.exports = app;
