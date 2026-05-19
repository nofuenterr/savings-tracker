import { NextFunction, Request, Response, Router } from 'express';

import authRouterFactory from '../modules/auth/routes/authRoute';
import configurePassport from '../includes/config/passport';

const passport = configurePassport();
const authRouter = authRouterFactory(passport);

const router = Router();

router.use('/', async (_req: Request, _res: Response, next: NextFunction) => {
  console.log('App loaded');
  next();
});
router.use('/auth', authRouter);

export default router;
