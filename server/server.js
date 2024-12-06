// Import required modules
import http from "http";
import app from "./app.js"; // Application setup
import connectDb from "./db/index.js"; // Database connection

// Connect to the database
connectDb();

// Create an HTTP server
const server = http.createServer(app);

// Define the port
const PORT = process.env.PORT || 8080;

// Start the server
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
