import express, { Request, Response } from "express";
import cors from "cors";
import authRouter from "./routes/authRouter";
import taskRouter from "./routes/taskRouter";
import Logger from "./middleware/logger";
import errorHandler from "./middleware/errorHandler";
import cookieParser from "cookie-parser";

const app = express();

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   }),
// );

const allowedOrigins = ["http://localhost:5173", "http://localhost:4173"];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(Logger);

app.get("/", (req: Request, res: Response): void => {
  res.status(200).send("Hello");
});

app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/tasks", taskRouter);
app.use(errorHandler);
export default app;
