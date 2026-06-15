import Database from "../config/database";
import { UserFromDb } from "../types/types";

export const saveUserToDb = (email: string, password: string) => {
  const insert = Database.prepare(
    "INSERT INTO users (email, password_hash) VALUES (?, ?) RETURNING *",
  );
  const insertedUser = insert.get(email, password) as UserFromDb | undefined;
  return insertedUser;
};

export const getUserFromDb = (email: string) => {
  const getUserStatement = Database.prepare(
    "SELECT * FROM users WHERE email = ?",
  );
  const userData = getUserStatement.get(email) as UserFromDb | undefined;
  return userData;
};
export const getUserWithIdFromDb = (id: number) => {
  const getUserStatement = Database.prepare("SELECT * FROM users WHERE id = ?");
  const userData = getUserStatement.get(id) as UserFromDb | undefined;
  return userData;
};
