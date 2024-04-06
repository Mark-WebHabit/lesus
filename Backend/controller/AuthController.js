import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { hasFalsyElement } from "../utilities/array.js";

import { sendSMS } from "../config/twilio.js";
import { generateSixDigitCode, validPhone } from "../utilities/number.js";

// models
import { Users } from "../models/Users.js";
import { Tokens } from "../models/Token.js";

export const requestCode = asyncHandler(async (req, res) => {
  const { contact } = req.body;

  if (!contact) return res.status(400).json({ data: "Phone number required" });

  let phone;
  if (contact.substring(0, 2) === "09" && contact.length === 11) {
    // If you intend to convert it to another format (e.g., replace "09" with "639" for international format)
    phone = "+63" + contact.substring(1); // This converts "09xxxx" to "639xxxx"
  } else if (contact.substring(0, 3) === "639" && contact.length === 12) {
    phone = "+" + contact;
  } else {
    // If none of the conditions are met, return an error response.
    return res.status(400).json({ data: "Invalid Phone Number Format" });
  }
  const code = generateSixDigitCode();

  if (!validPhone) {
    return res.status(400).json({ data: "Invalid Phone Format" });
  }

  await sendSMS(`Your LESUS account OTP is ${code}`, phone);

  return res.json({ data: code });
});

export const registerAccount = asyncHandler(async (req, res) => {
  const { contact, username, address, password } = req.body;

  //   this checks if any of the argumetns has falsy value
  const hasFalsy = hasFalsyElement(contact, username, address, password);

  if (hasFalsy)
    return res.status(400).json({ data: "All Fields Are Required" });

  let phone;
  if (contact.substring(0, 2) === "09" && contact.length === 11) {
    // If you intend to convert it to another format (e.g., replace "09" with "639" for international format)
    phone = "+63" + contact.substring(1); // This converts "09xxxx" to "639xxxx"
  } else if (contact.substring(0, 3) === "639" && contact.length === 12) {
    phone = "+" + contact;
  } else {
    // If none of the conditions are met, return an error response.
    return res.status(400).json({ data: "Invalid Phone Number Format" });
  }

  const exisitingContact = await Users.findOne({ phone });

  if (exisitingContact)
    return res.status(409).json({ data: "Contact Number Already Exists" });

  const ExisitingUsername = await Users.findOne({ username: username });

  if (ExisitingUsername)
    return res.status(409).json({ data: "Username Already taken" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new Users({
    contact,
    username,
    password: hashedPassword,
    address,
  });

  let result = await newUser.save();
  let userObject = result.toObject(); // Convert the document to a plain JavaScript object
  delete userObject.password; // Now you can safely delete the password

  return res.status(201).json({ data: userObject });
});

export const verifiyUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // change all the send with render if a page is creataed
  if (!id) return res.status(404).send("Unknown User!");

  const user = await Users.findById(id);
  if (!user) return res.status(404).send("Unauthoried User");
  const token = await Tokens.findOne({ userId: user._id });

  if (!token) return res.status(404).json({ data: "Invalid Credentials" });

  await jwt.verify(
    token.emailVerificationToken,
    process.env.VERIFICATION_EMAIL_TOKEN,
    async (decoded, err) => {
      if (err) {
        const delToken = await Tokens.findOneAndDelete({ _id: token._id });
        const delUser = await Users.findOneAndDelete({ _id: user._id });
        return res.status(400).send("Token Expired");
      }

      const { userId } = decoded;

      const verify = await Users.findOneAndUpdate(
        { _id: userId },
        { verified: true }
      );

      if (verify) {
        return res.redirect(process.env.CLIENT_URl);
      }
    }
  );

  // const user = await Users.findOneAndUpdate({ _id: id }, { verified: true });
});

export const login = asyncHandler(async (req, res) => {
  const { contactOrUsername, password } = req.body;

  const hasFalsy = hasFalsyElement(contactOrUsername, password);
  if (hasFalsy)
    return res
      .status(400)
      .json({ data: "Please Provide Username and Password" });

  const user = await Users.findOne({
    $or: [{ username: contactOrUsername }, { contact: contactOrUsername }],
  });
  if (!user) return res.status(404).json({ data: "Account doesnt exists" });

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch)
    return res.status(400).json({ data: "Wrong Account Information" });

  const access_token = await jwt.sign(
    { userId: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );
  const refresh_token = await jwt.sign(
    { userId: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  const refToken = await Users.findOneAndUpdate(
    { _id: user._id },
    { refreshToken: refresh_token }
  );

  res.cookie("access_token", access_token, {
    httpOnly: true,
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 7 days
    sameSite: "None", // Adjust according to your needs
    secure: process.env.NODE_ENV === "production", // Use secure in production
  });

  return res.status(200).json({ data: true, role: user.role });
});

export const getAuthUser = asyncHandler(async (req, res) => {
  const accessToken = req.cookies?.access_token;

  if (!accessToken) {
    return res.status(401).json({ data: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    // If the access token is valid, find the user and proceed.
    const user = await Users.findById(decoded.userId);
    if (!user) return res.status(403).json({ data: "User not found" });

    let userObj = user.toObject();
    delete userObj.password;

    return res.status(200).json({ data: user });
  } catch (error) {
    // If the error is due to token expiration, attempt to refresh it.
    if (error instanceof jwt.TokenExpiredError) {
      // You might need to extract userId differently based on your token structure.
      const { userId } = jwt.decode(accessToken);
      const user = await Users.findById(userId);
      if (!user || !user.refreshToken)
        return res.status(403).json({ data: "Refresh token invalid" });

      try {
        jwt.verify(user.refreshToken, process.env.REFRESH_TOKEN_SECRET);
        // Token is valid; create a new access token.
        const newAccessToken = jwt.sign(
          { userId: user._id },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "1d" }
        );

        res.cookie("access_token", newAccessToken, {
          httpOnly: true,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
          sameSite: "None",
          secure: process.env.NODE_ENV === "production",
        });

        let userObj = user.toObject();
        delete userObj.password;
        // After setting the new token, you might redirect or continue the request.
        return res.status(200).json({ data: userObj });
      } catch (refreshError) {
        // Handle invalid refresh token.
        return res
          .status(403)
          .json({ data: "Refresh token expired or invalid." });
      }
    } else {
      // Handle other verification errors (e.g., token tampered).
      return res.status(403).json({ data: "Access token invalid." });
    }
  }
});

export const logout = asyncHandler(async (req, res) => {
  const accessToken = req.cookies?.access_token || null;
  const { userId } = req.params;

  console.log(userId);
  console.log(accessToken);

  if (!userId) {
    return res
      .status(401)
      .json({ data: "Invalid Parameter: Expected A User ID" });
  }

  const user = await Users.findById(userId);

  if (!user) return res.status(401).json({ data: "Unknown User" });

  //delete refreshtoken from db
  await Users.findOneAndUpdate({ _id: user._id }, { refreshToken: null });

  if (!accessToken) {
    return res.status(204);
  }

  res.clearCookie("access_token");

  return res.status(204).json({ data: "Loggedout" });
});
