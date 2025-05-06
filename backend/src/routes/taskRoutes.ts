import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import createTaskMiddleware from "../middlewares/createTaskMiddleware";
import createTaskController from "../controllers/createTaskController";
import getTasksController from "../controllers/getTasksController";


const taskRoutes = Router();

taskRoutes.post("/task",authMiddleware,createTaskMiddleware,createTaskController);
taskRoutes.get("/tasks",authMiddleware,getTasksController);





export default taskRoutes;