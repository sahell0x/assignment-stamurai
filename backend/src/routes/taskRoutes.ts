import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import createTaskMiddleware from "../middlewares/createTaskMiddleware";
import createTaskController from "../controllers/createTaskController";
import getTasksController from "../controllers/getTasksController";
import deleteTaskController from "../controllers/deleteTaskController";
import updateTaskController from "../controllers/updateTaskController";


const taskRoutes = Router();

taskRoutes.post("/task",authMiddleware,createTaskMiddleware,createTaskController);
taskRoutes.get("/tasks",authMiddleware,getTasksController);
taskRoutes.delete("/task",authMiddleware,deleteTaskController);
taskRoutes.patch("/task",authMiddleware,updateTaskController);


export default taskRoutes;