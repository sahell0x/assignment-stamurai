import { Request, Response } from "express";
import Task from "../db_models/taskModel";

const getTasksController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {

    const userId = req.userId;

    const tasks = await Task.find({
        $or:[
            { createdBy: userId },
            { assignedTo: userId },
        ]
    });
    if (!tasks) {
      return res.status(400).json({
        message: "Somthing went wrong",
      });
    }

    return res.status(200).json(tasks);
  } catch (e) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export default getTasksController;
