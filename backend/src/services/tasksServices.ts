import {
  getAllTasksOfUserFromDb,
  saveTaskToDb,
  updateTaskInDb,
} from "../repositories/taskRepo";
import { Task } from "../types/types";

export const getAllTasks = (user_id: number) => {
  return getAllTasksOfUserFromDb(user_id);
};

export const createNewTask = (task: Task) => {
  return saveTaskToDb(task);
};

export const editExistingTask = (task: Task) => {
  return updateTaskInDb(task);
};
