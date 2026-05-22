import { NextFunction, Request, Response, Router } from 'express';

import authRouterFactory from '../modules/auth/routes/authRoute';
import dashboardRouter from '../modules/dashboard/routes/dashboardRoute';
import configurePassport from '../includes/config/passport';
import { requireAuth } from '../middleware/authMiddleware';

const passport = configurePassport();
const authRouter = authRouterFactory(passport);

const router = Router();

router.use('/', async (_req: Request, _res: Response, next: NextFunction) => {
  console.log('App loaded');
  next();
});
router.use('/auth', authRouter);
router.use('/dashboard', requireAuth, dashboardRouter);

export default router;
