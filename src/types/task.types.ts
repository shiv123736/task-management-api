// id
// title
// status       // default: TODO
// priority     // default: MEDIUM
// teamId
// assignedTo
// createdAt
// dueDate

// 1. Define runtime constant arrays using 'as const'
export const VALID_PRIORITIES = ["low", "medium", "high"] as const;
export const VALID_STATUSES = ["todo", "in_progress", "completed"] as const;

// 2. Derive TypeScript types directly from the constant arrays
export type TaskPriority = typeof VALID_PRIORITIES[number]; // "low" | "medium" | "high"
export type TaskStatus = typeof VALID_STATUSES[number];     // "todo" | "in_progress" | "completed"

export interface Task {
    id: string;
    title: string;
    status: TaskStatus;
    priority: TaskPriority;
    teamId: string;
    assignedTo: string;
    createdAt: Date;
    dueDate?: Date;
}


