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
import {
  forgotPasswordLimiter,
  loginLimiter,
  registerLimiter,
  resetPasswordLimiter,
  verifyResetTokenLimiter,
} from '../middleware/rateLimitMiddleware';

const authRouterFactory = (passport: PassportStatic) => {
  const authRouter = Router();

  authRouter.post(
    '/register',
    registerLimiter,
    validate(registerSchema),
    register,
  );
  authRouter.post(
    '/login',
    loginLimiter,
    validate(loginSchema),
    login(passport),
  );
  authRouter.post('/logout', logout);
  authRouter.post(
    '/forgot-password',
    forgotPasswordLimiter,
    validate(forgotPasswordSchema),
    forgotPassword,
  );
  authRouter.post(
    '/verify-reset-token',
    verifyResetTokenLimiter,
    validate(verifyResetTokenSchema),
    verifyResetToken,
  );
  authRouter.post(
    '/reset-password',
    resetPasswordLimiter,
    validate(resetPasswordSchema),
    resetPassword,
  );

  return authRouter;
};

export default authRouterFactory;
