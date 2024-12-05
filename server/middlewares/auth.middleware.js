// middlewares/auth.middleware.js
const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { sendResponse } = require("../utils/response.util");

/**
 * Middleware to authenticate a user using a JWT token.
 */
const authUser = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return sendResponse(res, 401, false, "Unauthorized: No token provided");
    }

    // Verify token
    const decodedToken = await jwt.verify(token, process.env.JWTSECRETKEY);

    // Find user associated with the token
    const user = await UserModel.findById(decodedToken._id);
    if (!user) {
      return sendResponse(res, 401, false, "Invalid token: User not found");
    }

    // Attach user to request object
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle token verification or database errors
    return sendResponse(res, 500, false, "Internal Server Error", {
      error: error.message,
    });
  }
};

module.exports = { authUser };
