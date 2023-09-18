import { RequestHandler } from "express";

export const fourOhFour: RequestHandler = (_req, res) => {
  return res.status(404).json({ message: "not found" });
};
