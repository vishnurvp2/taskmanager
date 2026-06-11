import { getUserFromDb, saveUserToDb } from "../repositories/authRepo";
import { hashPassword, verifyPassword } from "../utility/passwordHashVerify";
import { User } from "../types/types";

export const createNewUserAccount = async (userData: User) => {
  const existingUser = getUserFromDb(userData.email);
  if (existingUser !== undefined) {
    throw new Error("Email already registered");
  }
  const hashedPassword = await hashPassword(userData.password);
  return saveUserToDb({ ...userData, password: hashedPassword });
};

export const getUserAccount = async (email: string, password: string) => {
  const existingUser = getUserFromDb(email);
  if (existingUser !== undefined) {
    const isPasswordValid = await verifyPassword(
      password,
      existingUser.password_hash,
    );
    if (isPasswordValid) {
      return existingUser;
    }
  }
};
