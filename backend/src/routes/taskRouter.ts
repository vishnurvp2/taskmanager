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

export default taskRouter;
