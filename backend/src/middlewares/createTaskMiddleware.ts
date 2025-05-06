import { Request, Response, NextFunction } from "express";
import taskType from "../zod_types/taskType";

const createTaskMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const body = req.body;
  const { success } = taskType.safeParse(body);

  if (!success) {
    return res.status(400).json({
      message: "Invalid inputs",
    });
  }
  next();
};

export default createTaskMiddleware;
