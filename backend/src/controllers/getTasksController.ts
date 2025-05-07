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
    }).lean();
    if (!tasks) {
      return res.status(400).json({
        message: "Somthing went wrong",
      });
    }

    const transformedTasks = tasks.map(({ _id, ...rest }) => ({
        id: _id.toString(),
        ...rest,
      }));

    return res.status(200).json(transformedTasks);
  } catch (e) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export default getTasksController;
