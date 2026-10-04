
import { Request, Response } from "express";
import * as taskService from "../services/task.service.js";


// create all api endpoint for tasks, take reference from task.route.ts file and implement the logic in this controller file.
export const getAllTasks = (req: Request, res: Response) => {
    const { page, limit, status } = req.query as unknown as {
        page: number;
        limit: number;
        status?: string;
    };
    const tasks = taskService.getAllTasks(page, limit, status);
    res.status(200).json({ tasks });
};

export const getTaskById = (req: Request<{ id: string }>, res: Response) => {
    const task = taskService.getTaskById(req.params.id);
    res.status(200).json({ task });
};

export const createTask = (req: Request, res: Response) => {
    const result = taskService.createTask(req.body);
    res.status(201).json({ task: result });
}

export const updateTask = (req: Request<{ id: string }>, res: Response) => {
    const result = taskService.updateTask(req.params.id, req.body);
    res.status(200).json({ UpdatedTask: result });

}

export const deleteTask = (req: Request<{ id: string }>, res: Response) => {
    const result = taskService.deleteTask(req.params.id);
    res.status(204).send();
}