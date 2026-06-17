import Database from "../config/database";
import sql from "../config/db";
import { Task, TaskFromDb } from "../types/types";

export const saveTaskToDb = async (task: Task) => {
  const result: TaskFromDb[] = await sql`
    INSERT INTO tasks (
      user_id,
      title,
      description,
      status,
      priority,
      due_date
    )
    VALUES (
      ${task.user_id},
      ${task.title},
      ${task.description ?? null},
      ${task.status ?? "pending"},
      ${task.priority ?? "low"},
      ${task.due_date ?? null}
    )
    RETURNING *;
  `;

  return result[0] ?? null;
};

export const updateTaskInDb = async (task: TaskFromDb) => {
  const result = await sql`
    UPDATE tasks
    SET
      title = ${task.title},
      description = ${task.description ?? null},
      priority = ${task.priority},
      status = ${task.status},
      due_date = ${task.due_date ?? null},
      updated_at = NOW()
    WHERE
      id = ${task.id}
      AND user_id = ${task.user_id}
    RETURNING id
  `;
  return result.length > 0;
};

export const deleteTaskInDb = async (id: number) => {
  if (id === undefined) {
    return;
  }
  const result = await sql`DELETE FROM tasks WHERE id=${id} RETURNING *;`;
  return result.length > 0;
};

export const getAllTasksOfUserFromDb = async (user_id: string) => {
  const result: TaskFromDb[] =
    await sql`SELECT * FROM tasks where user_id=${user_id}`;
  return result;
};
