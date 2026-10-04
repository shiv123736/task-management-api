import { Request, Response } from 'express';
import * as authService from '../services/auth.service.js';

export const register = async (req: Request, res: Response) => {
    const result = await authService.register(req.body);
    res.status(201).json({ user: result });
}

export const login = async (req: Request, res: Response) => {
    const result = await authService.login(req.body.email, req.body.password);
    return res.status(200).json(result);
}

export const confirmAuthencity = async (req: Request, res: Response) => {
    if (!req.refreshToken) {
        return res.status(401).json({ message: "Refresh token is missing" });
    }
    const result = await authService.confirmAuthencity(req.user, req.refreshToken);
    return res.status(200).json(result);
}

export const logout = async (req: Request, res: Response) => {
    if (!req.refreshToken) {
        return res.status(401).json({ message: "Refresh token is missing" });
    }
    authService.logout(req.refreshToken);
    return res.status(200).json({ message: 'Logout successfully' });
}