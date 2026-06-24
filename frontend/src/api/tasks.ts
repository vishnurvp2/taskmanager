import { API_URL } from "../config/api";
import type { Task } from "../types/types";

export const getAllTasks = async () => {
  const response = await fetch(`${API_URL}/tasks/`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

export const saveTask = async (task: Task) => {
  const response = await fetch(`${API_URL}/tasks/`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task }),
  });
  const data = await response.json();
  return data;
};
export const saveTaskByPrompt = async (prompt: string) => {
  const response = await fetch(`${API_URL}/tasks/prompt`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });
  const data = await response.json();
  return data;
};
