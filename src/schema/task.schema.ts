import {z} from "zod";
import { VALID_PRIORITIES, VALID_STATUSES } from "../types/task.types";

export const createTaskSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    priority: z.enum(VALID_PRIORITIES, { message: "Invalid priority" }),
    status: z.enum(VALID_STATUSES, { message: "Invalid status" }).optional(),
    teamId: z.string().min(1, { message: "Team ID is required" }),
    assignedTo: z.string().optional(),
    dueDate: z.string().optional(),
});

export const updateTaskSchema = z.object({
    title: z.string().min(1, { message: "Title must not be empty" }).optional(),
    priority: z.enum(VALID_PRIORITIES, { message: "Invalid priority" }).optional(),
    status: z.enum(VALID_STATUSES, { message: "Invalid status" }).optional(),
    assignedTo: z.string().optional(),
}).refine(
    (data) => Object.keys(data).length > 0,
    {
        message: "At least one field is required for update",
    }
);


export const taskQuerySchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).default(10),
    status: z.enum(VALID_STATUSES, { message: "Invalid status" }).optional()
});

export const taskParamsSchema = z.object({
    id: z.string().min(1, { message: "Task ID is required" }),
});