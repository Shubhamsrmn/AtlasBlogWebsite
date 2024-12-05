// Import Mongoose for MongoDB connection
const mongoose = require("mongoose");

// Function to connect to MongoDB
const connectDb = async () => {
  try {
    // Use the MONGO connection string from the environment variables
    const connection = await mongoose.connect(process.env.MONGODBURL);
    console.log("Connected to database");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); // Exit process with failure
  }
};

// Export the database connection function
module.exports = connectDb;
