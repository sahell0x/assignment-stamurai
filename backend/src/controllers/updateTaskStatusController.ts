import { Request, Response } from "express";
import Task from "../db_models/taskModel";

const updateTaskStatusController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {

    const userId = req.userId;
    const taskId = req.body.taskId;
    const taskUpdatedStatus = req.body.taskUpdatedStatus;

    const task = await Task.findOneAndUpdate({$and:[
        {
            _id:taskId
        },
        {$or:[
            {createdBy:userId},
            {assignedTo:userId}
        ]},
    ]},taskUpdatedStatus);


    if(!task){
        return res.status(403).json({
            message:"Cant update task status"
        })
    }


    return res.status(200).json({
        message:"Task status updated successfully",
    });
  } catch (e) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export default updateTaskStatusController;
