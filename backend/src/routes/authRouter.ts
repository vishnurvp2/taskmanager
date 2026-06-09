import express from "express";
const authRouter = express.Router();

authRouter.get("/", (req, res) => {
  res.send("got get request at authRouter get");
});

authRouter.post("/", (req, res) => {
  res.send("got post request at authrouter post");
});

authRouter.post("/login", (req, res) => {
  res.send("got login request");
});

authRouter.post("/signup", (req, res) => {
  res.send("got signup request");
});

export default authRouter;
