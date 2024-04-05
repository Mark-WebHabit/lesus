import express from "express";

// controllers
import {
  registerAccount,
  verifiyUser,
  requestCode,
  login,
  getAuthUser,
  logout,
} from "../controller/AuthController.js";

const router = express.Router();

router.post("/register", registerAccount);
router.post("/login", login);
router.post("/verify/:id", verifiyUser);
router.post("/code", requestCode);
router.get("/", getAuthUser);
router.get("/logout/:userId", logout);

export default router;
