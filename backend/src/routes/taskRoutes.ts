import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import createTaskMiddleware from "../middlewares/createTaskMiddleware";
import createTaskController from "../controllers/createTaskController";
import getTasksController from "../controllers/getTasksController";
import deleteTaskController from "../controllers/deleteTaskController";
import updateTaskController from "../controllers/updateTaskController";
import updateTaskStatusController from "../controllers/updateTaskStatusController";


const taskRoutes = Router();

taskRoutes.post("/task",authMiddleware,createTaskMiddleware,createTaskController);
taskRoutes.get("/tasks",authMiddleware,getTasksController);
taskRoutes.delete("/task",authMiddleware,deleteTaskController);
taskRoutes.patch("/task",authMiddleware,updateTaskController);
taskRoutes.patch("/task/status",authMiddleware,updateTaskStatusController);




export default taskRoutes;