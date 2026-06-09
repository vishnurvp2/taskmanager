import { Request, Response, NextFunction } from "express";
import getErrorMessage from "../utility/getErrorMessage";

const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) {
    next(error);
    return;
  }
  res.status(500).json({
    error: {
      message: getErrorMessage(error),
    },
  });
  next(error);
};

export default errorHandler;
