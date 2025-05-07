import { Request, Response } from "express";
import Task from "../db_models/taskModel";

const createTaskController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const task = req.body;

    task.createdBy = req.userId;

    const response = await Task.create(task);
    if (!response) {
      return res.status(400).json({
        message: "can't create task",
      });
    }

    return res.status(201).json({
     id: response._id,
     title: response.title,
     dueDate:response.dueDate,
     priority:response.priority,
     status:response.status,
     createdBy:response.createdBy,
     assignedTo:response.assignedTo,
     assignedToName:response.assignedToName,
    });
  } catch (e) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export default createTaskController;
