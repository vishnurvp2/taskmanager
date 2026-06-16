import express from "express";
import { authenticateToken } from "../middleware/auth";
import {
  createTask,
  deleteTask,
  editTask,
  getTasks,
} from "../controllers/tasksController";
const taskRouter = express.Router();

taskRouter.get("/", authenticateToken, getTasks); // Get all tasks
taskRouter.post("/", authenticateToken, createTask); // Create task
taskRouter.post("/edit", authenticateToken, editTask); // Edit existing task
taskRouter.delete("/delete", authenticateToken, deleteTask); // Delete existing task

taskRouter.get("/:id", (req, res) => {
  const taskId = req.params.id;
  res.send(`got get request fot task id ${taskId}`);
});

taskRouter.delete("/:id", (req, res) => {
  const taskId = req.params?.id;
  const title = req.body?.title;
  res.send(`got delete request to delete task ${taskId} with title ${title}`);
});

export default taskRouter;
