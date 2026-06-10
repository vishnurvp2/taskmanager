import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth";
import { createNewTask } from "../services/tasksServices";

export const createTask = async (req: AuthenticatedRequest, res: Response) => {
  const { title, description, status, priority, due_date } = req.body;
  const result = await createNewTask({
    user_id: req.user?.userId,
    title,
    description,
    status,
    priority,
    due_date,
  });
  return res.status(200).json(result);
};
