import { getTasksFromDb, saveTaskToDb } from "../repositories/taskRepo";
import { Task } from "../types/types";

export const getAllTasks = (user_id: number) => {
  return getTasksFromDb(user_id);
};

export const createNewTask = (task: Task) => {
  return saveTaskToDb(task);
};
