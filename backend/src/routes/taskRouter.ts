import express from "express";
import { authenticateToken } from "../middleware/auth";
import { createTask, getTasks } from "../controllers/tasksController";
const taskRouter = express.Router();

taskRouter.get("/", authenticateToken, getTasks);

taskRouter.get("/:id", (req, res) => {
  const taskId = req.params.id;
  res.send(`got get request fot task id ${taskId}`);
});

taskRouter.post("/", authenticateToken, createTask);

taskRouter.put("/:id", (req, res) => {
  const taskId = req.params?.id;
  const title = req.body?.title;
  res.send(`got put request to update task ${taskId} with title ${title}`);
});

taskRouter.delete("/:id", (req, res) => {
  const taskId = req.params?.id;
  const title = req.body?.title;
  res.send(`got delete request to delete task ${taskId} with title ${title}`);
});

export default taskRouter;
