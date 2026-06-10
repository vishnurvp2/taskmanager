import { Request, Response } from "express";
import {
  createNewUserAccount,
  loginToUserAccount,
} from "../services/userServices";
import { UserFromDb } from "../types/types";
import jwt from "jsonwebtoken";

const TEN_DAYS_IN_MS = 10 * 24 * 60 * 60 * 1000;

export const registerUser = async (req: Request, res: Response) => {
  try {
    // 1. Grab data from the request body
    const { email, password, name } = req.body;

    // 2. Pass it to the service layer
    const newUser: UserFromDb | undefined = (await createNewUserAccount({
      email,
      password,
      name,
    })) as UserFromDb | undefined;

    // 3. Send back success response
    return res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await loginToUserAccount(email, password);
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || "your_fallback_secret",
      { expiresIn: "10d" },
    );
    res.cookie("token", token, {
      httpOnly: true, // Prevents client-side scripts from reading the cookie
      secure: process.env.NODE_ENV === "production", // Use HTTPS only in production
      sameSite: "strict", // Protects against CSRF attacks
      maxAge: TEN_DAYS_IN_MS, // Forces cookie deletion after exactly 10 days
    });

    return res.status(200).json({
      message: "Login successful",
      userId: user.id,
    });
  } catch (error: any) {
    return res.status(500).json({ message: "Internal server Error" });
  }
};
