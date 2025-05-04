import jwt from "jsonwebtoken";
import User from "../db_models/userModel";
import dotenv from "dotenv";
import { Request, Response } from "express";

import { compare } from "bcrypt";

dotenv.config();

const secret: string = process.env.SECRET as string;

const loginController = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Wrong email or password" });
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ email: user.email, id: user._id }, secret);



    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });



    return res.status(200).json({
        email: user.email,
        id: user._id,
        name:user.name
    });
  } catch {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export default loginController;
