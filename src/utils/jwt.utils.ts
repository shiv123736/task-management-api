import jwt, { sign, verify } from 'jsonwebtoken';
import { JwtPayload } from '../types/jwt.types';
import 'dotenv/config';

// jwt secret from .env file
const JWT_SECRET = process.env.SECRET_KEY;

if (!JWT_SECRET) {
    throw new Error("FATAL ERROR: JWT_SECRET is not defined in the environment.");
}

const options: jwt.SignOptions = { expiresIn: '1m' };
const optionsRefreshToken: jwt.SignOptions = { expiresIn: '7d'};

// create a function to generate a JWT token
export const generateToken = (payload: JwtPayload): string => {
    return sign(payload, JWT_SECRET, options);
};

// create a function to verify a JWT token
export const verifyToken = (token: string): JwtPayload | null => {
    try {
        const decoded = verify(token, JWT_SECRET) as JwtPayload;
        return decoded;
    }
    catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
};

// generate refresh token
export const generateRefreshToken = (payload: JwtPayload): string => {
    return sign(payload, JWT_SECRET, optionsRefreshToken)
}
