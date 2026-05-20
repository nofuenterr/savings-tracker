import { Router } from 'express';
import { PassportStatic } from 'passport';

import { validate } from '../../../middleware/validateMiddleware';
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  verifyResetTokenSchema,
} from '../schemas/authSchema';
import {
  forgotPassword,
  login,
  logout,
  register,
  resetPassword,
  verifyResetToken,
} from '../controllers/authController';

const authRouterFactory = (passport: PassportStatic) => {
  const authRouter = Router();

  authRouter.post('/register', validate(registerSchema), register);
  authRouter.post('/login', validate(loginSchema), login(passport));
  authRouter.post('/logout', logout);

  authRouter.post(
    '/forgot-password',
    validate(forgotPasswordSchema),
    forgotPassword,
  );
  authRouter.post(
    '/verify-reset-token',
    validate(verifyResetTokenSchema),
    verifyResetToken,
  );
  authRouter.post(
    '/reset-password',
    validate(resetPasswordSchema),
    resetPassword,
  );

  return authRouter;
};

export default authRouterFactory;
