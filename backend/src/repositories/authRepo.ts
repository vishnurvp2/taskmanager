import Database from "../config/database";
import { User, UserFromDb } from "../types/types";

export const saveUserToDb = (userData: User) => {
  // save to database
  const insert = Database.prepare(
    "INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?) RETURNING *",
  );
  const insertedUser: UserFromDb | undefined = insert.get(
    userData.email,
    userData.password,
    userData.name,
  ) as UserFromDb | undefined;

  return insertedUser;
};

export const getUserFromDb = (email: string) => {
  // get from database and check and return result
  const getUserStatement = Database.prepare(
    "SELECT * FROM users WHERE email = ?",
  );
  const userData = getUserStatement.get(email) as UserFromDb | undefined;
  return userData;
};
