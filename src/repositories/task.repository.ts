import { Task, VALID_PRIORITIES, VALID_STATUSES } from "../types/task.types";

// need to create in memory storage for tasks
export const tasks: Task[] = [];

// Types representing one valid value
type TaskStatus = typeof VALID_STATUSES[number];
type TaskPriority = typeof VALID_PRIORITIES[number];


// 1. Define realistic IT task titles
const taskTitles = [
    "Implement JWT authentication flow",
    "Fix memory leak in WebSocket connection pool",
    "Design database schema for subscription billing",
    "Migrate legacy CSS to Tailwind CSS",
    "Update API documentation using Swagger/OpenAPI",
    "Set up Redis caching for product catalog endpoints",
    "Optimize Dockerfile to reduce image size",
    "Refactor user profile component for accessibility",
    "Integrate Stripe payment gateway SDK",
    "Set up Datadog alerts for HTTP 5xx spikes",
    "Build multi-language localization switcher",
    "Investigate security vulnerability in third-party dependency",
    "Write unit tests for authentication middleware",
    "Configure CI/CD pipeline using GitHub Actions",
    "Implement dark mode theme support",
    "Add search functionality to data grid table",
    "Fix PostgreSQL indexing issue on audit logs",
    "Create CSV export feature for admin dashboard",
    "Set up CORS policies for cross-origin requests",
    "Clean up unused legacy images from AWS S3 bucket"
];

// Possible values
const statuses: TaskStatus[] = [
    "todo",
    "in_progress",
    "completed",
];

const priorities: TaskPriority[] = [
    "low",
    "medium",
    "high",
];
// 3. Generate tasks dynamically using a loop
taskTitles.forEach((title, index) => {
    const id = (index + 1).toString();

    // Rotate through statuses, priorities, teams, and assignees
    const status = statuses[index % statuses.length];
    const priority = priorities[index % priorities.length];
    const teamId = ((index % 4) + 1).toString(); // Teams 1 through 4
    const assignedTo = ((index % 6) + 1).toString(); // Assignees 1 through 6

    // Dynamically vary due dates based on status
    let daysFromNow = 5;
    if (status === "todo") daysFromNow = (index % 7) + 3;      // Due in 3 to 9 days
    if (status === "in_progress") daysFromNow = (index % 3) + 1; // Due in 1 to 3 days
    if (status === "completed") daysFromNow = -(index % 5) - 1;      // Completed 1 to 5 days ago

    tasks.push({
        id,
        title,
        status: status ?? "todo",
        priority: priority ?? "medium",
        teamId,
        assignedTo,
        createdAt: new Date(),
        dueDate: new Date(Date.now() + daysFromNow * 24 * 60 * 60 * 1000),
    });
});

export const getAllTasks = (page: number, limit: number, status?: string) => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    if (tasks.length === 0) {
        return false;
    }
    let filterByStatus = tasks;
    if (status) {
        filterByStatus = filterByStatus.filter((t) => t.status === status);
    }
    const filteredTasks = filterByStatus.slice(startIndex, endIndex);
    if (filteredTasks.length === 0) {
        return false;
    }
    return filteredTasks;
}

// create a function to get a task by id
export const getTaskById = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) {
        return null;
    }
    return task;
}

// create a function to create a new task
export const createTask = (newTask: Task) => {
    const createTask: Task = {
        id: Date.now().toString(),
        title: newTask.title,
        status: newTask.status || "TODO",
        priority: newTask.priority || "MEDIUM",
        teamId: newTask.teamId,
        assignedTo: newTask.assignedTo,
        createdAt: new Date(),
    };
    tasks.push(createTask);
    return createTask;
}

// create a function to update a task by id
export const updateTask = (id: string, taskData: Task) => {
    const taskIndex = tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) {
        return null;
    }
    const updatedTask = { ...tasks[taskIndex], ...taskData };
    tasks[taskIndex] = updatedTask;
    return updatedTask;
}

// create a function to delete a task by id
export const deleteTask = (id: string) => {
    const taskIndex = tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) {
        return null;
    }
    return tasks.splice(taskIndex, 1)[0];
}

