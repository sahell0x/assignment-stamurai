import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import getUserInfoController from "../controllers/getUserInfoController";
import getUsersController from "../controllers/getUsersController";


const userRoutes = Router();

userRoutes.get("/user",authMiddleware,getUserInfoController);
userRoutes.get("/users",authMiddleware,getUsersController);


export default userRoutes;