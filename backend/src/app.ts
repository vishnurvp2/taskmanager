// Initializes the Express application and middleware.
import express, { Request, Response } from "express";
import authRouter from "./routes/authRouter";
import taskRouter from "./routes/taskRouter";
import Logger from "./middleware/logger";
import errorHandler from "./middleware/errorHandler";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(Logger);

app.get("/", (req: Request, res: Response): void => {
  res.send("Hello");
});

app.use("/auth", authRouter);
app.use("/tasks", taskRouter);
app.use(errorHandler);
export default app;
