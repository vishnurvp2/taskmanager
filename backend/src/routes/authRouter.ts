import express from "express";
import { loginOrSignupUser, verifyUser } from "../controllers/authController";
import { authenticateToken } from "../middleware/auth";

const authRouter = express.Router();
authRouter.get("/verify_user", authenticateToken, verifyUser);
authRouter.post("/login_signup", loginOrSignupUser);
export default authRouter;
