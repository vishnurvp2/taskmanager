import express from "express";

const Auth = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  res.send("got authentication request");
};

export default Auth;
