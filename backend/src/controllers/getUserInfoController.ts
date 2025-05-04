import User from "../db_models/userModel";
import { Request, Response } from "express";

const getUserInfoController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const userId = req.userId;

    const userInfo = await User.findOne({ _id: userId });
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

export default getUserInfoController;
