import express from "express";
import fs from "node:fs";
import path from "node:path";

const Logger = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const logPath = path.join(__dirname, "../", "server.log");
  const logLine = `${req.method} ${req.path} ${new Date().toISOString()}\n`;
  fs.appendFile(logPath, logLine, (err) => {
    if (err) {
      console.error("Failed to write to log file:", err);
    }
  });

  console.log(logPath);
  console.log(logLine);
  next();
};

export default Logger;
