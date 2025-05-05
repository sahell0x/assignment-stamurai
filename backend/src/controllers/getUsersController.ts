import User from "../db_models/userModel";
import { Request, Response } from "express";

const getUsersController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const userId = req.userId;

    const userInfo = await User.find({ _id: { $ne: userId } });
    if (!userInfo) {
      return res.status(400).json({
        message: "bad request user info not found",
      });
    }

    const filteredUsersData = userInfo.map((_) => {
      return {
        id: _._id,
        name: _.name,
        email: _.email,
      };
    });

    return res.status(200).json({
        users : filteredUsersData
    });
  } catch (e) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export default getUsersController;
