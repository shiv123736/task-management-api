

export class TaskNotFoundError extends Error {
    // constructor to accept a taskId and create a message
    constructor(taskId?: string) {
        if (taskId === undefined || taskId === null) {
            super(`Task not found`);
        } else {
            super(`Task with id ${taskId} not found`);
        }   
        this.name = "TaskNotFoundError";
    }
}

export class TaskNotCreatedError extends Error {
    constructor() {
        super(`Task not created`);
        this.name = "TaskNotCreatedError";
    }  
}

export class InvalidQueryParamsError extends Error {
    constructor(message?: string) {
        super(message || `Invalid query parameters`);
        this.name = "InvalidQueryParamsError";
    }
}

