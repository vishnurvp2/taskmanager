import express from "express";
import Auth from "../middleware/auth";
const taskRouter = express.Router();

taskRouter.use(Auth);

taskRouter.get("/", (req, res) => {
  res.send("got get request to get all tasks");
});

taskRouter.get("/:id", (req, res) => {
  const taskId = req.params.id;
  res.send(`got get request fot task id ${taskId}`);
});

taskRouter.post("/", (req, res) => {
  res.send("got post request to create task");
});

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
