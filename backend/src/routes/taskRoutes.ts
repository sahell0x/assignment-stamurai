import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import createTaskMiddleware from "../middlewares/createTaskMiddleware";
import createTaskController from "../controllers/createTaskController";


const taskRoutes = Router();

taskRoutes.post("/task",authMiddleware,createTaskMiddleware,createTaskController);



export default taskRoutes;