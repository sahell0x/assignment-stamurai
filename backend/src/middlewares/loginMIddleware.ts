import loginType from "../zod_types/loginType";
import { Request, Response, NextFunction } from "express";

const loginMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const body = req.body;
  const { success } = loginType.safeParse(body);

  if (!success) {
    return res.status(400).json({
      message: "Invalid inputs",
    });
  }
  next();
};

export default loginMiddleware;
