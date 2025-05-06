import { Request, Response } from "express";
import Task from "../db_models/taskModel";

const createTaskController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const userId = req.userId;

    const userInfo = await Task.create({
        
    });
    if (!userInfo) {
      return res.status(400).json({
        message: "bad request user info not found",
      });
    }

    return res.status(200).json({
      id: userInfo._id,
      email: userInfo.email,
      name:userInfo.name,
    });
  } catch (e) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export default createTaskController;
