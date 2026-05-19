import { Router } from 'express';
import { PassportStatic } from 'passport';

import { validate } from '../../../middleware/validateMiddleware';
import { loginSchema, registerSchema } from '../schemas/authSchema';
import { login, logout, register } from '../controllers/authController';

const authRouterFactory = (passport: PassportStatic) => {
  const authRouter = Router();

  authRouter.post('/register', validate(registerSchema), register);
  authRouter.post('/login', validate(loginSchema), login(passport));
  authRouter.post('/logout', logout);

  return authRouter;
};

export default authRouterFactory;
