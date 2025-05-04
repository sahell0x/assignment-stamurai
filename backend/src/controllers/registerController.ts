import jwt from "jsonwebtoken";
import User from "../db_models/userModel";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { Request, Response } from "express";

dotenv.config();

const secret: string = process.env.SECRET as string;

const registerController = async (req: Request, res: Response): Promise<any> => {
  try {
    const body = req.body;

    const isUserAlreadyExist = await User.findOne({
      email: body.email,
    });

    if (isUserAlreadyExist) {
      return res.status(409).json({ error: "Email already in use" });
    }

    body.password = await bcrypt.hash(body.password, 13);

    const userData = {
      email: body.email,
      password: body.password,
      name: body.name,
    };

    const user = await User.create(userData);

    if (user) {
      const token = jwt.sign({ email: user.email, id: user._id }, secret);

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      return res.status(201).json({
        email: user.email,
        id: user._id,
      });
    }

    throw new Error("somthing wents wrong");
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export default registerController;
