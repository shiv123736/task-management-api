import { InvalidQueryParamsError, TaskNotCreatedError, TaskNotFoundError } from "../errors/task.error.js";
import { UserNotFoundError, UserAlreadyExistsError, InvalidCredentialsError, UserNotCreatedError, AccessRevokedError } from "../errors/auth.error"
import { Request, Response, NextFunction } from "express";


const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof TaskNotFoundError) {
        res.status(404).json({ error: err.message });
    }
    else if (err instanceof InvalidQueryParamsError) {
        res.status(400).json({ error: err.message });
    }
    else if (err instanceof TaskNotCreatedError) {
        res.status(400).json({ error: err.message });
    }
    else if (err instanceof UserNotFoundError) {
        res.status(404).json({ error: err.message });
    } 
    else if (err instanceof UserAlreadyExistsError) {
        res.status(409).json({ error: err.message });
    } 
    else if (err instanceof InvalidCredentialsError) {
        res.status(401).json({ error: err.message });
    } 
    else if (err instanceof UserNotCreatedError) {
        res.status(400).json({ error: err.message });
    } 
    else if (err instanceof AccessRevokedError) {
        res.status(400).json({ error: err.message})
    }
    else {
        res.status(500).json({ error: "Internal server error" });
    }

}


export default errorHandler;