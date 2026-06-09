import Database from "../config/database";

export const saveUserToDb = async (userData: unknown) => {
  // save to database
  return { id: 123, email: "" };
};

export const findUserByEmail = (email: string): boolean => {
  // get from database and check and return result
  return true;
};
