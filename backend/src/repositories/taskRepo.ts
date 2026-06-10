import Database from "../config/database";
import { Task, TaskFromDb } from "../types/types";

export const saveTaskToDb = (data: Task) => {
  // 1. Start with the mandatory columns
  const columns = ["user_id", "title"];
  const placeholders = ["?", "?"];
  const values: any[] = [data.user_id, data.title];

  // 2. Conditionally add optional fields only if they have a value
  if (data.description !== undefined) {
    columns.push("description");
    placeholders.push("?");
    values.push(data.description); // Can be string or null
  }
  if (data.status !== undefined) {
    columns.push("status");
    placeholders.push("?");
    values.push(data.status);
  }
  if (data.priority !== undefined) {
    columns.push("priority");
    placeholders.push("?");
    values.push(data.priority);
  }
  if (data.due_date !== undefined) {
    columns.push("due_date");
    placeholders.push("?");
    values.push(data.due_date);
  }

  // 3. Assemble the query safely
  const queryString = `
    INSERT INTO tasks (${columns.join(", ")}) 
    VALUES (${placeholders.join(", ")}) 
    RETURNING *;
  `;

  // 4. Prepare and execute the statement
  const insert = Database.prepare(queryString);
  const result = insert.get(...values) as TaskFromDb | undefined;

  return result;
};
export const getTasksFromDb = (userId: number) => {
  const insert = Database.prepare("SELECT * FROM tasks where user_id = ?;");
  const result = insert.get(userId) as TaskFromDb | undefined;
  return result;
};
