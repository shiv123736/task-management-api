import { Router } from "express";
import { createTask, getAllTasks, updateTask, getTaskById, deleteTask } from "../controllers/task.controller";
import { createTaskSchema, taskParamsSchema, taskQuerySchema, updateTaskSchema } from "../schema/task.schema";
import { validate } from "../middleware/validation.middleware";
import { authenticate } from "../middleware/authenticate.middleware";
import { authorize } from "../middleware/authorization.middleware";

const taskRouter = Router();

taskRouter.get("/tasks", validate(taskQuerySchema, "query"), authenticate, getAllTasks);

taskRouter.get("/tasks/:id", validate(taskParamsSchema, "params"), getTaskById);

taskRouter.post("/tasks", validate(createTaskSchema, "body"), createTask);

taskRouter.put("/tasks/:id", validate(updateTaskSchema, "body"), updateTask);

taskRouter.delete("/tasks/:id", authenticate, authorize("admin"), validate(taskParamsSchema, "params"), deleteTask);

export default taskRouter;