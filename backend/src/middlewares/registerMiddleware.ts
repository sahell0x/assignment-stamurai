import resgisterType from "../zod_types/registerType";
import { Request, Response, NextFunction } from "express";

const registerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const body = req.body;
  const { success } = resgisterType.safeParse(body);

  if (!success) {
    return res.status(400).json({
      message: "Invalid inputs",
    });
  }
  next();
};

export default registerMiddleware;
