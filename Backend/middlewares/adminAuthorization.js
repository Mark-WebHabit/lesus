import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { promisify } from "util"; // Import promisify for converting callback-based functions to promises
import { Users } from "../models/Users.js";

// Convert jwt.verify to a promise-based function for better async/await usage
const verifyJwt = promisify(jwt.verify);

export const adminAuthorization = asyncHandler(async (req, res, next) => {
  // Retrieve the access token from cookies
  const accessToken = req.cookies?.access_token;

  // If there's no access token, return Unauthorized error
  if (!accessToken) {
    return res.status(401).json({ data: "Unauthorized" });
  }

  try {
    // Verify the access token
    const decoded = await verifyJwt(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    // Find the user by ID obtained from the decoded token
    const user = await Users.findById(decoded.userId);

    // If user doesn't exist or isn't an admin, return Unauthorized error
    if (!user || user.role !== "admin") {
      return res.status(401).json({ data: "Not allowed to perform operation" });
    }

    // If verification is successful and user is admin, proceed with the request
    return next();
  } catch (error) {
    // If there was an error verifying the access token, it might be expired

    // Attempt to decode the expired token to extract the userId
    const decoded = jwt.decode(accessToken);
    if (!decoded || !decoded.userId) {
      return res.status(401).json({ data: "Unauthorized" });
    }

    // Find the user using the userId from the expired token
    const user = await Users.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ data: "Unknown User" });
    }

    // Check if the user has a refresh token stored
    const refreshToken = user.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ data: "Session expired" });
    }

    // Verify the refresh token
    try {
      await verifyJwt(refreshToken, process.env.REFRESH_TOKEN_SECRET);

      // If refresh token is valid, re-issue a new access token
      const newAccessToken = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      // Set the new access token in the cookie
      res.cookie("access_token", newAccessToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day
        sameSite: "None", // Adjust according to your needs
        secure: process.env.NODE_ENV === "production", // Use secure in production
      });

      // Proceed with the request
      return next();
    } catch (refreshError) {
      // If there was an error verifying the refresh token, return Session Expired error
      return res.status(401).json({ data: "Session Expired" });
    }
  }
});
