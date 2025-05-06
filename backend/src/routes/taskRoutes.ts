import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";


const taskRoutes = Router();

taskRoutes.post("/task",authMiddleware,)



export default taskRoutes;