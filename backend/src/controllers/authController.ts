import { Request, Response } from "express";
import { createNewUserAccount } from "../services/userServices";
import { UserFromDb } from "../types/types";

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
