
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.utils";
import { JwtPayload } from "../types/jwt.types";


export const authenticate = (
    req: Request,
    res: Response,
    next: NextFunction  
) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {   
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = verifyToken(token) as JwtPayload;
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};


export const refreshTokenValidation = (
    req: Request,
    res: Response,
    next: NextFunction  
) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {   
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decoded = verifyToken(token) as JwtPayload;
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid Refresh token' });
        }
        if(decoded.type !== "refresh") {
            return res.status(401).json({ message: 'Invalid Refresh token' });
        }
        req.user = decoded;
        req.refreshToken = token;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid Refresh token' });
    }
};

