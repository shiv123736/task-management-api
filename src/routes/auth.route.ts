import router from 'express';
import { register, login, confirmAuthencity, logout } from '../controllers/auth.controller';
import { validate } from '../middleware/validation.middleware';
import { registerSchema, loginSchema } from '../schema/auth.schema';
import { authenticate, refreshTokenValidation } from '../middleware/authenticate.middleware';

export const authRouter = router.Router();

authRouter.post('/register', validate(registerSchema), register);

authRouter.post('/login', validate(loginSchema), login);

authRouter.post('/refresh',  refreshTokenValidation, confirmAuthencity);

authRouter.post('/logout', refreshTokenValidation, logout);