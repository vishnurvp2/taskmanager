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
  const result = await updateTaskInDb(req.body);
  if (result) {
    return res.status(200).json(result);
  } else {
    return res.status(500).json("Internal Server Error");
  }
};
export const deleteTask = async (req: Request, res: Response) => {
  const id = req.body.taskId;
  const result = await deleteTaskInDb(id);
  if (result) {
    return res.status(200).json("deleted");
  } else {
    return res.status(500).json("Internal Server Error");
  }
};

export const getTasks = async (req: Request, res: Response) => {
  const result = await getAllTasks(res.locals.userId);
  return res.status(200).json(result);
};
