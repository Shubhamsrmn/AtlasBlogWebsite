// Import required modules
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    fullName: {
      firstName: {
        type: String,
        required: true,
        minLength: [3, "First name must be 3 or more characters"],
      },
      lastName: {
        type: String,
        required: true,
        minLength: [3, "Last name must be 3 or more characters"],
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minLength: [5, "Email must be 5 or more characters"],
    },
    password: {
      type: String,
      required: true,
      select: false, // Exclude password by default in queries
    },
    socketId: {
      type: String,
    },
  },
  { timestamps: true }
);

// Hash password before saving to the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Skip if password is not modified
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Generate JWT token for the user
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { _id: this._id, email: this.email, firstName: this.fullName.firstName },
    process.env.JWTSECRETKEY
  );
};

// Compare plain text password with hashed password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Export the user model
module.exports = mongoose.model("User", userSchema);
