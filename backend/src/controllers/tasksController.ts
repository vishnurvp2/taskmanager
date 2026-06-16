import { Request, Response } from "express";
import { createNewTask, getAllTasks } from "../services/tasksServices";
import { deleteTaskInDb, updateTaskInDb } from "../repositories/taskRepo";

export const createTask = async (req: Request, res: Response) => {
  const { title, description, status, priority, due_date } = req.body.task;
  const result = await createNewTask({
    user_id: res.locals.userId,
    title,
    description,
    status,
    priority,
    due_date,
  });
  return res.status(200).json(result);
};

export const editTask = async (req: Request, res: Response) => {
  const { id, title, description, status, priority, due_date } = req.body;
  const result = await updateTaskInDb({
    id,
    user_id: res.locals.userId,
    title,
    description,
    status,
    priority,
    due_date,
  });
  return res.status(200).json(result);
};
export const deleteTask = async (req: Request, res: Response) => {
  const id = req.body.taskId;
  const result = await deleteTaskInDb(id);
  return res.status(200).json("deleted");
};

export const getTasks = async (req: Request, res: Response) => {
  const result = await getAllTasks(res.locals.userId);
  return res.status(200).json(result);
};
