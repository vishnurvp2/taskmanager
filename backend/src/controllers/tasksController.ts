import { Request, Response } from "express";
import { createNewTask, getAllTasks } from "../services/tasksServices";

export const createTask = async (req: Request, res: Response) => {
  const { title, description, status, priority, due_date } = req.body;
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

export const getTasks = async (req: Request, res: Response) => {
  const result = await getAllTasks(res.locals.userId);
  return res.status(200).json(result);
};
