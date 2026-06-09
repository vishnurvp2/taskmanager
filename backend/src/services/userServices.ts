import { findUserByEmail, saveUserToDb } from "../repositories/repository";

export const createNewUserAccount = (userData: any) => {
  // 1. Business Logic: Check if email is already taken
  const existingUser = findUserByEmail(userData.email);
  if (existingUser) {
    throw new Error("Email already registered");
  }

  // 2. Business Logic: Hash the password here (e.g., using bcrypt)
  // const hashedPassword = await bcrypt.hash(userData.password, 10);

  // 3. Pass clean data to the repository layer to be saved
  return saveUserToDb(userData);
};
