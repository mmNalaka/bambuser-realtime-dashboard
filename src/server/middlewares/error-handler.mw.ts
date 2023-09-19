import { ErrorRequestHandler } from "express";
import { config } from "../config";

export const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  console.log(err);
  res.status(500).json({
    message:
      config.nodeEnv === "development" ? `${err}` : "Internal Server Error",
    stack: config.nodeEnv === "development" ? `${err.stack}` : "🥞",
  });
  next();
};
