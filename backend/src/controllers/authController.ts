import { Request, Response } from "express";
import { createNewUserAccount } from "../services/userServices";

export const registerUser = async (req: Request, res: Response) => {
  try {
    // 1. Grab data from the request body
    const { email, password, name } = req.body;

    // 2. Pass it to the service layer
    const newUser = await createNewUserAccount({ email, password, name });

    // 3. Send back success response
    return res
      .status(201)
      .json({ message: "User registered successfully", userId: newUser.id });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};
