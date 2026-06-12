import express from "express";
import { loginOrSignupUser } from "../controllers/authController";

const authRouter = express.Router();
authRouter.post("/login_signup", loginOrSignupUser);
export default authRouter;
