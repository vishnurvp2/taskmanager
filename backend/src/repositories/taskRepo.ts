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

export const updateTaskInDb = (data: Partial<TaskFromDb>) => {
  const updates: string[] = [];
  const values: any[] = [];

  if (data.title !== undefined) {
    updates.push("title = ?");
    values.push(data.title);
  }

  if (data.description !== undefined) {
    updates.push("description = ?");
    values.push(data.description);
  }

  if (data.status !== undefined) {
    updates.push("status = ?");
    values.push(data.status);
  }

  if (data.priority !== undefined) {
    updates.push("priority = ?");
    values.push(data.priority);
  }

  if (data.due_date !== undefined) {
    updates.push("due_date = ?");
    values.push(data.due_date);
  }

  // Nothing to update
  if (updates.length === 0) {
    return undefined;
  }

  values.push(data.id);

  const queryString = `
    UPDATE tasks
    SET ${updates.join(", ")}
    WHERE id = ?
    RETURNING *;
  `;

  const update = Database.prepare(queryString);
  const result = update.get(...values) as TaskFromDb | undefined;

  return result;
};

export const deleteTaskInDb = (id: number) => {
  if (id === undefined) {
    return;
  }
  const queryString = `
    DELETE FROM tasks
    WHERE id = ?
    RETURNING *;
  `;

  const update = Database.prepare(queryString);
  const result = update.get(id) as TaskFromDb | undefined;

  return result;
};

export const getAllTasksOfUserFromDb = (userId: number) => {
  const insert = Database.prepare("SELECT * FROM tasks where user_id = ?;");
  const result = insert.all(userId) as unknown as TaskFromDb[] | undefined;
  return result;
};
