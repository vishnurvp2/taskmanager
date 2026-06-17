import sql from "../config/db";
import { UserFromDb } from "../types/types";

export const saveUserToDb = async (email: string, password: string) => {
  const result: UserFromDb[] =
    await sql`INSERT INTO users (email, password) VALUES (${email},${password}) RETURNING *`;
  return result[0] ?? null;
};

export const getUserFromDb = async (email: string) => {
  const result: UserFromDb[] =
    await sql`SELECT * FROM users WHERE email = ${email}`;
  return result[0] ?? null;
};
export const getUserWithIdFromDb = async (id: string) => {
  const result: UserFromDb[] = await sql`SELECT * FROM users WHERE id=${id};`;
  return result[0] ?? null;
};
