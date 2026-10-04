import { Task } from "../types/task.types";
import * as taskRepository from "../repositories/task.repository.js";
import * as taskError from "../errors/task.error.js";



export const getAllTasks = (page: number, limit: number, status?: string) => {
    const result = taskRepository.getAllTasks(page, limit, status);
    if (!result) {
        return [];
    }
    return result;
}


export const getTaskById = (id: string) => {
    const task = taskRepository.getTaskById(id);
    if (!task) {
        throw new taskError.TaskNotFoundError(id);
    }
    return task;
};


export const createTask = (taskData: Task) => {
    const result = taskRepository.createTask(taskData);
    if (!result) {
        throw new taskError.TaskNotCreatedError();
    }
    return result;
}


export const updateTask = (id: string, taskData: Task) => {
    const result = taskRepository.updateTask(id, taskData);
    if (!result) {
        throw new taskError.TaskNotFoundError(id);
    }
    return result;
}

export const deleteTask = (id: string) => {
    const result = taskRepository.deleteTask(id);
    if (!result) {
        throw new taskError.TaskNotFoundError(id);
    }
    return true;
}
