import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import getUserInfoController from "../controllers/getUserInfoController";


const userRoutes = Router();

userRoutes.get("/user",authMiddleware,getUserInfoController)

export default userRoutes;