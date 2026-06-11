import express from "express";
import {
  loginOrSignupUser,
  loginUser,
  registerUser,
} from "../controllers/authController";

const authRouter = express.Router();
authRouter.post("/login", loginUser);
authRouter.post("/login_signup", loginOrSignupUser);
authRouter.post("/signup", registerUser);

export default authRouter;
