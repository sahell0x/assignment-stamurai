import { Router } from "express";
import registerMiddleware from "../middlewares/registerMiddleware";
import loginMiddleware from "../middlewares/loginMIddleware";
import registerController from "../controllers/registerController";
import loginController from "../controllers/loginController";
import authMiddleware from "../middlewares/authMiddleware";
import logoutController from "../controllers/logoutController";


const authRoutes = Router();

authRoutes.post("/register",registerMiddleware,registerController);
authRoutes.post("/login",loginMiddleware,loginController);
authRoutes.post("/logout",authMiddleware,logoutController);

export default authRoutes;