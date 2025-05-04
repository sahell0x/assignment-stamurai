import { Router } from "express";
import registerMiddleware from "../middlewares/registerMiddleware";
import loginMiddleware from "../middlewares/loginMIddleware";
import registerController from "../controllers/registerController";


const authRoutes = Router();

authRoutes.post("/register",registerMiddleware,registerController);
// authRoutes.post("/login",loginMiddleware);

export default authRoutes;