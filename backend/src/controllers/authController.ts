import { Request, Response } from "express";
import { UserFromDb } from "../types/types";
import jwt from "jsonwebtoken";
import {
  getUserFromDb,
  getUserWithIdFromDb,
  saveUserToDb,
} from "../repositories/userRepo";
import { hashPassword, verifyPassword } from "../utility/passwordHashVerify";

const TEN_DAYS_IN_MS = 10 * 24 * 60 * 60 * 1000;

export const loginUser = async (
  res: Response,
  password: string,
  user: UserFromDb | undefined,
) => {
  try {
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || "", {
      expiresIn: "10d",
    });
    res.cookie("token", token, {
      httpOnly: true, // Prevents client-side scripts from reading the cookie
      secure: process.env.NODE_ENV === "production", // Use HTTPS only in production
      sameSite: "strict", // Protects against CSRF attacks
      maxAge: TEN_DAYS_IN_MS, // Forces cookie deletion after exactly 10 days
    });
    if (user !== undefined) {
      user.password = "";
    }
    return res.status(200).json({
      user,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: "Internal server Error" });
  }
};

export const loginOrSignupUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (email === "" || password === "")
    return res.status(400).json({ message: "invalid inputs and bad request" });
  const user = await getUserFromDb(email);
  if (user === null) {
    const hashedPassword = await hashPassword(password);
    const newUser = await saveUserToDb(email, hashedPassword);
    return await loginUser(res, password, newUser);
  } else {
    return await loginUser(res, password, user);
  }
};

export const verifyUser = async (req: Request, res: Response) => {
  if (res.locals.userId !== undefined) {
    const user = await getUserWithIdFromDb(res.locals.userId);
    return res.status(200).json({
      message: "Login successful",
      user,
    });
  } else {
    return res.status(400).json("authentication faild");
  }
};

export const logoutUser = (req: Request, res: Response) => {
  // Clear the cookie by setting its maxAge/expires to the past
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Must match login config
    sameSite: "strict",
    maxAge: TEN_DAYS_IN_MS,
  });

  // Send a success status back to your React app
  return res.status(200).json({ message: "Logged out successfully" });
};
