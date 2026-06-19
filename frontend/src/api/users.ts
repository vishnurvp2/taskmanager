import { API_URL } from "../config/api";
import type { UserFromDb } from "../types/types";

export const verifyUser = async () => {
  const response = await fetch(`${API_URL}/auth/verify_user`, {
    credentials: "include",
  });
  if (response.ok) {
    const data = await response.json();
    return data.user as UserFromDb;
  }
  return undefined;
};

export const loginOrSignupUser = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/login_signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  });
  const data = await response.json();
  return data;
};
