import { Request, Response } from "express";
import Task from "../db_models/taskModel";

const updateTaskController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {

    const userId = req.userId;
    const taskId = req.body.taskId;
    const taskBody = req.body.payload;

    const task = await Task.findOneAndUpdate({$and:[
        {_id:taskId},
        {createdBy:userId}
    ]},taskBody);


    if(!task){
        return res.status(403).json({
            message:"Cant update task "
        })
    }


    return res.status(200).json({
        message:"Task updated successfully",
    });
  } catch (e) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export default updateTaskController;
