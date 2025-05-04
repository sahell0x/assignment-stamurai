import { Router } from "express";
import registerMiddleware from "../middlewares/registerMiddleware";
import loginMiddleware from "../middlewares/loginMIddleware";
import registerController from "../controllers/registerController";
import loginController from "../controllers/loginController";


const authRoutes = Router();

authRoutes.post("/register",registerMiddleware,registerController);
authRoutes.post("/login",loginMiddleware,loginController);

export default authRoutes;