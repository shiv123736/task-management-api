import { Request, Response, NextFunction } from "express";
import { Roles } from "../types/user.types";

export const authorize = (requiredRole: Roles) => {
    return (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        if(!req.user) {
            res.status(401).json({
                success: false,
                message: 'Authentication required. Please login'
            });
            return;
        }

        const role: Roles = req.user.role
        // create login to authorize user
        if (!role || role !== requiredRole) {
            res.status(403).json({
                success: false,
                message: 'Access Denied, Unauthorized role.'
            });
            return;
        }
        next();
    }
}