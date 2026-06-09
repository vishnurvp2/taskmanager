import express from "express";
const Logger = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  console.log(`${req.method} ${req.path} ${new Date().toISOString()}`);
  next();
};

export default Logger;
