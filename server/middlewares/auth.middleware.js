import { userModel as UserModel } from "../models/user.model.js";
import { tokenModel as TokenModel } from "../models/blacklistedToken.model.js";

import jwt from "jsonwebtoken";
import { sendResponse } from "../utils/response.util.js";
import { captainModel as CaptainModel } from "../models/captain.model.js";

/**
 * Middleware to authenticate a user using a JWT token.
 */
export const authUser = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return sendResponse(res, 401, false, "Unauthorized: No token provided");
    }

    // check for logout token
    const isBlacklistedToken = await TokenModel.findOne({
      token: token,
    });

    //if token is from logout token then it is not valid
    if (isBlacklistedToken) {
      return sendResponse(res, 401, false, "Invalid token: User not found");
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
export const authCaptain = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return sendResponse(res, 401, false, "Unauthorized: No token provided");
    }

    // check for logout token
    const isBlacklistedToken = await TokenModel.findOne({
      token: token,
    });

    //if token is from logout token then it is not valid
    if (isBlacklistedToken) {
      return sendResponse(res, 401, false, "Invalid token: Captain not found");
    }

    // Verify token
    const decodedToken = await jwt.verify(token, process.env.JWTSECRETKEY);

    // Find user associated with the token
    const captain = await CaptainModel.findById(decodedToken._id);
    if (!captain) {
      return sendResponse(res, 401, false, "Invalid token: Captain not found");
    }

    // Attach user to request object
    req.captain = captain;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle token verification or database errors
    return sendResponse(res, 500, false, "Internal Server Error", {
      error: error.message,
    });
  }
};
