import {jwtPayload} from "../types/jwt.types";

declare global {    
    namespace Express {
        interface Request {
            user?: jwtPayload; // Add the user property to the Request interface
            refreshToken?: string
        }
    }
}

export {};