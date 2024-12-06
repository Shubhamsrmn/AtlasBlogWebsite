import { captainModel as CaptainModel } from "../models/captain.model.js";
import { tokenModel as TokenModel } from "../models/blacklistedToken.model.js";
import { validationResult } from "express-validator";
import { sendResponse } from "../utils/response.util.js";

export const registerCaptainFun = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendResponse(res, 400, false, "Validation Error", {
        errors: errors.array(),
      });
    }

    const { firstName, lastName, email, password, vehicle } = req.body;
    console.log(req.body);

    // Ensure all required fields are provided
    if (!firstName || !email || !password || !vehicle) {
      return sendResponse(res, 400, false, "All fields are required");
    }

    const isCaptainAlreadyExist = await CaptainModel.findOne({ email });

    if (isCaptainAlreadyExist) {
      return sendResponse(res, 400, false, "Captain already exist");
    }
    const captain = await CaptainModel.create({
      fullName: { firstName, lastName },
      email,
      password,
      vehicle,
    });
    const token = await captain.generateAccessToken();

    // Respond with user data and token
    return sendResponse(res, 201, true, "Captain registered successfully", {
      captain,
      token,
    });
  } catch (error) {
    // Handle server errors
    return sendResponse(res, 500, false, "Internal Server Error", {
      error: error.message,
    });
  }
};

export const loginCaptainFun = async (req, res) => {
  try {
    // Validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendResponse(res, 400, false, "Validation Error", {
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    // Ensure all required fields are provided
    if (!email || !password) {
      return sendResponse(res, 400, false, "All fields are required");
    }

    // Find user by email
    const captain = await CaptainModel.findOne({ email }).select("+password");
    if (!captain) {
      return sendResponse(res, 401, false, "Invalid email or password");
    }

    // Check if password matches
    const isPasswordMatch = await captain.comparePassword(password);
    if (!isPasswordMatch) {
      return sendResponse(res, 401, false, "Invalid email or password");
    }

    // Generate access token
    const token = captain.generateAccessToken();

    //Set Token to Cookies
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
    });
    // Respond with token
    return sendResponse(res, 200, true, "Login successful", { token });
  } catch (error) {
    // Handle server errors
    return sendResponse(res, 500, false, "Internal Server Error", {
      error: error.message,
    });
  }
};

export const getCaptainProfileFun = async (req, res) => {
  try {
    // Respond with the user profile
    return sendResponse(res, 200, true, "Profile fetched successfully", {
      user: req.captain,
    });
  } catch (error) {
    // Handle server errors
    return sendResponse(res, 500, false, "Internal Server Error", {
      error: error.message,
    });
  }
};

export const logoutCaptainFun = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    await TokenModel.create({
      token: token,
    });
    res.clearCookie("token");
    return sendResponse(res, 200, true, "Logout successful");
  } catch (error) {
    // Handle server errors
    return sendResponse(res, 500, false, "Internal Server Error", {
      error: error.message,
    });
  }
};
