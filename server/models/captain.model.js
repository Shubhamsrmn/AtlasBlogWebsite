import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const captainSchema = new mongoose.Schema(
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
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    vehicle: {
      color: {
        type: String,
        minLength: [3, "min length of color characters is 3"],
        required: true,
      },
      plate: {
        type: String,
        minLength: [3, "min length of plate characters is 3"],
        required: true,
      },
      capacity: {
        type: Number,
        minLength: [1, "min capacity of vehicle is 1"],
        required: true,
      },
      vehicleType: {
        type: String,
        enum: ["car", "motorCycle", "auto"],
        required: true,
      },
    },
    socketId: {
      type: String,
    },
    location: {
      lat: {
        type: Number,
      },
      lng: {
        type: Number,
      },
    },
  },
  { timestamps: true }
);
captainSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Skip if password is not modified
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Generate JWT token for the user
captainSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { _id: this._id, email: this.email, firstName: this.fullName.firstName },
    process.env.JWTSECRETKEY,
    {
      expiresIn: process.env.JWTSECRETKEYEXPIRY,
    }
  );
};

// Compare plain text password with hashed password
captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const captainModel = mongoose.model("captain", captainSchema);
