import express from "express";
import {
  loginOrSignupUser,
  logoutUser,
  verifyUser,
} from "../controllers/authController";
import { authenticateToken } from "../middleware/auth";

const authRouter = express.Router();
authRouter.get("/verify_user", authenticateToken, verifyUser);
authRouter.post("/login_signup", loginOrSignupUser);
authRouter.get("/logout", logoutUser);
export default authRouter;
