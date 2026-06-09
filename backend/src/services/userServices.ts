import { getUserFromDb, saveUserToDb } from "../repositories/repository";
import bcrypt from "bcryptjs";
import { hashPassword } from "../utility/passwordHashVerify";
import { User, UserFromDb } from "../types/types";

export const createNewUserAccount = async (userData: User) => {
  // 1. Business Logic: Check if email is already taken
  const existingUser = getUserFromDb(userData.email);
  if (existingUser !== undefined) {
    throw new Error("Email already registered");
  }
  // hash password
  const hashedPassword = await hashPassword(userData.password);
  // 3. Pass clean data to the repository layer to be saved
  return saveUserToDb({ ...userData, password: hashedPassword });
};
