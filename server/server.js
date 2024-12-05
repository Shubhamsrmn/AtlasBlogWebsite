// Import required modules
const http = require("http");
const app = require("./app"); // Application setup
const connectDb = require("./db/index"); // Database connection

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
