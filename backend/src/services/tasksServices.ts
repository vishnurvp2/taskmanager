import {
  getAllTasksOfUserFromDb,
  saveTaskToDb,
  updateTaskInDb,
} from "../repositories/taskRepo";
import { Task, TaskFromDb } from "../types/types";

export const getAllTasks = async (user_id: string) => {
  return await getAllTasksOfUserFromDb(user_id);
};

export const createNewTask = async (task: Task) => {
  return await saveTaskToDb(task);
};

export const editExistingTask = async (task: TaskFromDb) => {
  return await updateTaskInDb(task);
};
